"use strict";

const WebSocket = require("ws");

/**
 * WebSocket Server
 * @param  {object} config Config object
 * @return {object}        Server object
 */
const wsServer = (config) => {
    const handleProtocols = (protocols /*, request */) => {
        for (var i = 0; i < protocols.length; i++) {
            if (protocols[i] === "text") {
                return "text";
            } else if (protocols[i] === "json") {
                return "json";
            }
        }
        return false;
    };



    /**
     * WebSocket Object
     * @type {WebSocket}
     */
    const wss = new WebSocket.Server({
        server: config.server,
        clientTracking: true,
        handleProtocols: handleProtocols // Manage what subprotocol to use.
    });



    /**
     * Message handler
     * @param  {[type]} message message object transmitted
     * @param  {[type]} wss     WebSocket server
     * @param  {[type]} ws      WebSocket connection
     * @return {void}         [description]
     */
    const messageHandler = (message, wss, ws) => {
        config.handleMessage(message, wss, ws);
    };

    const closeHandler = (wss, ws) => {
        config.handleClose(wss, ws);
    };

    wss.on("connection", (ws /*, req*/) => {
        const heartbeat = () => {
            ws.isAlive = true;
        };

        ws.isAlive = true;
        ws.on("message", (message) => {
            messageHandler(message, wss, ws);
        });
        ws.on("pong", heartbeat);
        ws.on("close", () => (closeHandler(wss, ws)));
    });

    wss.broadcastClient = (ws, data) => {
        ws.send(data);
    };

    // Broadcast data to everyone except one self (ws).
    wss.broadcastExcept = (ws, data) => {
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        });
    };

    wss.broadcastAll = (data) => {
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        });
    };



    setInterval(function ping() {
        wss.clients.forEach(function each(ws) {
            if (ws.isAlive === false) {
                return ws.terminate();
            }
            ws.isAlive = false;
            ws.ping('', false, true);
        });
    }, 10000);
    return this;
};

module.exports = wsServer;
