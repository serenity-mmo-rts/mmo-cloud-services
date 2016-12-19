//require('v8-profiler');

var zeromq = require('zmq');
var uuid = require('node-uuid');
var bson = require('bson');
var util = require('util');

var BSON = bson.BSONPure.BSON;
var Socket = zeromq.Socket;

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

    /*
    encoding of REQUEST messages (all parts should be encoded as Buffer because zeroMq uses Buffer):
    1: current destination/source (destination on the sending side and source on the receiving side)
    2: msgId (uuid)
    3: msgData (to be deserialized to the final javascript object)
    4: nextDestination
    5: nextNextDestination
    6: ...

    encoding of RESPONSE messages (all parts should be encoded as Buffer because zeroMq uses Buffer):
    1: current destination/source (destination on the sending side and source on the receiving side)
    2: msgId (uuid)
    3: msgData (to be deserialized to the final javascript object)


    OR:
     encoding of REQUEST messages (all parts should be encoded as Buffer because zeroMq uses Buffer):
     1: current destination/source (destination on the sending side and source on the receiving side)
     2: buffer with subencoding:
        1 byte: flag (request or response)
        16 byte: uuid
        remaining bytes: msgData with subencoding (done externally):
            4 bytes: X
            X bytes: nextDestination
            4 bytes: Y
            Y bytes: nextNextDestination
            remaining bytes: real msgData (to be deserialized to object at final destination)


    */

    this.on('message', function (source, data, dataNext) {
        var data2 = BSON.deserialize(data);
        var msgId = data2.msgId;
        var evt = data2.evt;
        var nDest = data2.nDest;
        var msgData = data2.msgData;
        var isRepl = data2.isRepl;
        if (isRepl) {
            // this is a reply message, therefore execute the callback
            self.replCallbacks[msgId](msgData);
            delete self.replCallbacks[msgId];
        }
        else if (nDest && nDest.length>0) {
            // forward this request to the next target and when the answer arrives hand it back to the source:
            //console.log(self.identity + ': forward to '+ nDest);
            self.sendReq(nDest, evt, msgData, function(answer){
                var data = {
                    msgId: msgId,
                    evt: null,
                    nDest: null,
                    msgData: answer,
                    isRepl: true
                };
                self.send([source, BSON.serialize(data, false, true, false), msgId]);
            });
        }
        else {
            // this is a new request message, therefore emit event with a function handle for replying
            var success = self.emit(
                evt,
                msgData,
                function (msgData) {
                    var data = {
                        msgId: msgId,
                        evt: null,
                        nDest: null,
                        msgData: msgData,
                        isRepl: true
                    };
                    self.send([source, BSON.serialize(data, false, true, false), msgId]);
                }
            );
            if (!success) {
                console.log("error: there is no event named " + evt);
                var data = {
                    msgId: msgId,
                    evt: null,
                    nDest: null,
                    msgData: "error: there is no event named " + evt,
                    isRepl: true
                };
                this.send([source, BSON.serialize(data, false, true, false), msgId]);
            }
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
 * Emits the "unbind" event.
 *
 * @param {String} destination
 * @param {Object} msgData
 * @param {Function} callback(msgDataReturn)
 * @return {Socket} for chaining
 * @api public
 */
AsyncSocket.prototype.sendReq = function (destination, evt, msgData, callback, timeout) {
    var msgId = uuid.v1();
    var nextDest;
    var data;
    if (Array.isArray(destination) ) {
        nextDest = destination[0];
        data = {
            msgId: msgId,
            evt: evt,
            nDest: destination.slice(1, destination.length),
            msgData: msgData,
            isRepl: false
        };
    }
    else {
        nextDest = destination;
        data = {
            msgId: msgId,
            evt: evt,
            nDest: null,
            msgData: msgData,
            isRepl: false
        };
    }
    this.replCallbacks[msgId] = callback;
    this.send([nextDest, BSON.serialize(data, false, true, false), msgId]);

    if(arguments.length > 4){
        var self = this;
        setTimeout(function(){
            if (self.replCallbacks.hasOwnProperty(msgId)) {
                var err = new Error("No reply after timeout is reached...")
                self.replCallbacks[msgId](null, err);
                delete self.replCallbacks[msgId];
            }
        },timeout)
    }

    return this;
};
