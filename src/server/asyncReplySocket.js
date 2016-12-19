//require('v8-profiler');

var zeromq = require('zmq');
var uuid = require('node-uuid');
var bson = require('bson');
var util = require('util');

var BSON = bson.BSONPure.BSON;
var Socket = zeromq.Socket;


/**
 *  Monitor events
 */
var msgFlags = {
    IS_REQ:   1,
    IS_REPLY: 2,
    IS_NOTIFY:   4
};


/**
 * Create a new async socket of the given `type`.
 *
 * @constructor
 * @param {String|Number} type
 * @api public
 */
var AsyncSocket = exports.AsyncSocket = function (type) {
    var self = this;
    Socket.call(this, type);

    this.replCallbacks = {};
    this.msgIdIterator = 1;

    /*
     encoding of messages (all parts should be encoded as Buffer because zeroMq uses Buffer internally):
     1: current destination/source (destination on the sending side and source on the receiving side)
     2: buffer with subencoding:
        1 byte: flag (request or response)
        16 byte: uuid
        remaining bytes: msgData with subencoding (can be done externally by a forwarder - not here):
            4 bytes: X
            X bytes: nextDestination
            4 bytes: Y
            Y bytes: nextNextDestination
            4 bytes: 0
            remaining bytes: real msgData (to be deserialized to object at final destination)


    */

    this.on('message', function (source, data) {

        var flags = data.readUInt8(0);
        var msgId = data.readUInt32LE(1);
        var msgData = data.slice(5); //remaining data

        if (flags & msgFlags.IS_REPLY) {
            // this is a reply message, therefore execute the callback
            if (!self.replCallbacks.hasOwnProperty(msgId)){
                console.log(self.identity + ": error: cannot find callback for this reply with msgId=" + msgId)
            }
            self.replCallbacks[msgId](msgData);
            delete self.replCallbacks[msgId];
        }
        else if (flags & msgFlags.IS_NOTIFY) {
            self.emit(
                "notify",
                msgData
            );
        }
        else {
            // this is a new request message, therefore emit event with a function handle for replying
            self.emit(
                "request",
                msgData,
                function reply(answer, isBufferWithHeader) {
                    var data;
                    if (isBufferWithHeader) {
                        data = answer;
                    }
                    else {
                        if (!Buffer.isBuffer(answer)) {
                            answer = new Buffer(String(answer), 'utf8');
                        }
                        data = new Buffer(5+answer.length);
                        answer.copy(data,5);
                    }
                    data.writeUInt8(msgFlags.IS_REPLY, 0);
                    data.writeUInt32LE(msgId,1);
                    self.send([source, data]);
                }
            );
        }
    });

};

/**
 * Inherit from zeromq `Socket.prototype`.
 */

util.inherits(AsyncSocket, Socket);

/**
 * sendReq
 *
 *
 * @param {String} destination
 * @param {Object} msgData
 * @param {Function} callback(msgDataReturn)
 * @return {Socket} for chaining
 * @api public
 */
AsyncSocket.prototype.sendReq = function (destination, msgData, callback, isBufferWithHeader, timeout) {
    var msgId = this.msgIdIterator++;
    var msgIdBuffer = new Buffer(4);
    msgIdBuffer.writeUInt32LE( msgId, 0);

    var data;
    if (isBufferWithHeader) {
        data = msgData;
    }
    else {
        if (!Buffer.isBuffer(msgData)) {
            msgData = new Buffer(String(msgData), 'utf8');
        }
        data = new Buffer(5+msgData.length);
        msgData.copy(data,5);
    }
    data.writeUInt8(msgFlags.IS_REQ, 0);
    msgIdBuffer.copy(data, 1);

    this.replCallbacks[msgId] = callback;
    //console.log(this.identity + ": added callback to this.replCallbacks for msgId: " + msgId);

    this.send([destination, data]);

    if(timeout){
        var self = this;
        setTimeout(function(){
            if (self.replCallbacks.hasOwnProperty(msgId)) {
                console.log("error: No reply after timeout is reached...");
                var err = new Error("No reply after timeout is reached...");
                self.replCallbacks[msgId](null, err);
                delete self.replCallbacks[msgId];
            }
        },timeout)
    }

    return this;
};

/**
 * sendNotify
 *
 *
 * @param {String} destination
 * @param {Object} msgData
 * @param {Function} callback(msgDataReturn)
 * @return {Socket} for chaining
 * @api public
 */
AsyncSocket.prototype.sendNotify = function (destination, msgData, isBufferWithHeader) {
    var msgId = this.msgIdIterator++;
    var msgIdBuffer = new Buffer(4);
    msgIdBuffer.writeUInt32LE( msgId, 0);

    var data;
    if (isBufferWithHeader) {
        data = msgData;
    }
    else {
        if (!Buffer.isBuffer(msgData)) {
            msgData = new Buffer(String(msgData), 'utf8');
        }
        data = new Buffer(5+msgData.length);
        msgData.copy(data,5);
    }
    data.writeUInt8(msgFlags.IS_NOTIFY, 0);
    msgIdBuffer.copy(data, 1);

    this.send([destination, data]);
    return this;
};


/**
 * Create a new async socket of the given `type`.
 *
 * @constructor
 * @param {String|Number} type
 * @api public
 */
var AsyncRouter = exports.AsyncRouter = function (type) {

    var self = this;
    AsyncSocket.call(this, type);

    this.connectedClients = {};

    this.on('request', function (msgData, replyFcn) {
        /* decode msgData Buffer
        remaining bytes: msgData with subencoding (can be done externally by a forwarder - not here):
        4 bytes: X
        X bytes: nextDestination
        4 bytes: Y
        Y bytes: nextNextDestination
        4 bytes: 0
        remaining bytes: real msgData (to be deserialized to object at final destination)
        */
        var destFieldSize = msgData.readUInt32LE(0);
        if (destFieldSize) {
            // forward message
            var destination = msgData.slice(4, 4 + destFieldSize);
            var destStr = destination.toString();
            msgData = msgData.slice(4 + destFieldSize);

            function forward() {
                AsyncRouter.super_.prototype.sendReq.call(self,
                    destination,
                    msgData,
                    function (answer) {
                        replyFcn(answer);
                    },
                    false,
                    false
                );
            }

            // check if destination is registered:
            if (!self.connectedClients.hasOwnProperty(destStr)) {
                self.emit('destNotFound', destStr, forward);
            }
            else {
                forward();
            }

        }
        else {
            // emit event:
            msgData = BSON.deserialize(msgData.slice(4));
            self.emit(msgData.evt,
                msgData.msgData,
                function(answer,err){
                    replyFcn(BSON.serialize(answer, false, true, false),err);
                }
            );
        }
    });

    this.on('notify', function (msgData) {
        /* decode msgData Buffer
         remaining bytes: msgData with subencoding (can be done externally by a forwarder - not here):
         4 bytes: X
         X bytes: nextDestination
         4 bytes: Y
         Y bytes: nextNextDestination
         4 bytes: 0
         remaining bytes: real msgData (to be deserialized to object at final destination)
         */
        var destFieldSize = msgData.readUInt32LE(0);
        if (destFieldSize) {
            // forward message
            var destination = msgData.slice(4, 4 + destFieldSize);
            var destStr = destination.toString();
            msgData = msgData.slice(4 + destFieldSize);

            function forward() {
                AsyncRouter.super_.prototype.sendNotify.call(self,
                    destination,
                    msgData,
                    false
                );
            }

            // check if destination is registered:
            if (!self.connectedClients.hasOwnProperty(destStr)) {
                self.emit('destNotFound',destStr,forward);
            }
            else {
                forward();
            }

        }
        else {
            // emit event:
            msgData = BSON.deserialize(msgData.slice(4));
            self.emit(msgData.evt, msgData.msgData);
        }
    });


    this.on( "register", function(clientIdentifier, reply) {
        self.connectedClients[clientIdentifier] = true;
        //console.log(this.identity + ': Registered '+ clientIdentifier);
        reply({
            success: true
        });
        self.emit("clientRegistered",clientIdentifier);
    });
}


/**
 * Inherit from zeromq `Socket.prototype`.
 */

util.inherits(AsyncRouter, AsyncSocket);


/**
 * sendReq
 *
 *
 * @param {String} destination
 * @param {Object} msgData
 * @param {Function} callback(msgDataReturn)
 * @return {Socket} for chaining
 * @api public
 */
AsyncRouter.prototype.sendReq = function (destination, evt, msgData, callback, timeout) {
    if (!Array.isArray(destination) ) {
        destination = [destination];
    }

    var nextDest = destination[0];
    if (!Buffer.isBuffer(nextDest)) {
        nextDest = new Buffer(String(nextDest), 'utf8');
    }

    var bufferList = [];

    // add empty placeholder for header:
    bufferList.push(new Buffer(5));

    var fieldSize;
    for (var k=1; k<destination.length; k++) {
        var dest = destination[k];
        if (!Buffer.isBuffer(dest)) {
            dest = new Buffer(String(dest), 'utf8');
        }

        fieldSize = new Buffer(4);
        fieldSize.writeUInt32LE(dest.length, 0);
        bufferList.push(fieldSize);
        bufferList.push(dest);
    }

    fieldSize = new Buffer(4);
    fieldSize.writeUInt32LE(0, 0);
    bufferList.push(fieldSize);
    var data  = {
        evt: evt,
        msgData: msgData
    };
    bufferList.push(BSON.serialize(data, false, true, false));

    function response(answer,err){
        answer = answer || 0;
        if (answer) {
            answer = BSON.deserialize(answer);
        }
        callback(answer,err);
    }

    var msgData = Buffer.concat(bufferList);
    AsyncRouter.super_.prototype.sendReq.call(this,
        nextDest,
        msgData,
        response,
        true,
        timeout
    );
};



/**
 * sendNotify
 *
 *
 * @param {String} destination
 * @param {Object} msgData
 * @param {Function} callback(msgDataReturn)
 * @return {Socket} for chaining
 * @api public
 */
AsyncRouter.prototype.sendNotify = function (destination, evt, msgData) {
    if (!Array.isArray(destination) ) {
        destination = [destination];
    }

    var nextDest = destination[0];
    if (!Buffer.isBuffer(nextDest)) {
        nextDest = new Buffer(String(nextDest), 'utf8');
    }

    var bufferList = [];

    // add empty placeholder for header:
    bufferList.push(new Buffer(5));

    var fieldSize;
    for (var k=1; k<destination.length; k++) {
        var dest = destination[k];
        if (!Buffer.isBuffer(dest)) {
            dest = new Buffer(String(dest), 'utf8');
        }

        fieldSize = new Buffer(4);
        fieldSize.writeUInt32LE(dest.length, 0);
        bufferList.push(fieldSize);
        bufferList.push(dest);
    }

    fieldSize = new Buffer(4);
    fieldSize.writeUInt32LE(0, 0);
    bufferList.push(fieldSize);
    var data  = {
        evt: evt,
        msgData: msgData
    };
    bufferList.push(BSON.serialize(data, false, true, false));

    var msgData = Buffer.concat(bufferList);
    AsyncRouter.super_.prototype.sendNotify.call(this,
        nextDest,
        msgData,
        true
    );
}