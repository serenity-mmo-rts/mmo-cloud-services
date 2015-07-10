//"use strict";
//debugger;
var fs = require('fs');
var httpProxy = require('http-proxy');
var http = require('http');
var https = require('https');


// Configure Proxy server:
var proxy = new httpProxy.createProxyServer({
    target: {
        host: 'localhost',
        port: 8080
    }
});
var httpsProxyServer = https.createServer(
    {
        key: fs.readFileSync('serenity-ssl-key.pem', 'utf8'),
        cert: fs.readFileSync('serenity-ssl-cert.pem', 'utf8')
    },
    function (req, res) {
        //console.log("test");
        proxy.web(req, res);
    }
);
httpsProxyServer.on('upgrade', function (req, socket, head) {
    console.log("forward upgrade of socket.io");
    //debugger;
    proxy.ws(req, socket, head);
});

// not working:
httpsProxyServer.on('newGameEvent', function (req, socket, head) {
    console.log("forward newGameEvent of socket.io");
    proxy.ws(req, socket, head);
});

httpsProxyServer.listen(443);