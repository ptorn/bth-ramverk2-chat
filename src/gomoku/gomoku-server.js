"use strict";

const wsServer = require("../websocket/ws-server");
const board = require('../gomoku/board');
const users = require('../gomoku/users');
const db = require('../gomoku/database')('gomoku');
let roomData = {};

/**
 * Handle message
 * @param  {object} message Message object.
 * @param  {object} wss     WebSocket object.
 * @param  {object} ws      WebSocket connection object.
 * @return {void}
 */

async function handleMessage(message, wss, ws) {
    let data = JSON.parse(message);

    updateRoomData();
    switch (data.type) {
        case "getUsers":
            broadcastClientJSON({
                type: "userList",
                users: users.users
            }, wss, ws);
            break;
        case "updateRoom":
            roomData.type = "updateRoom";
            updateRoomData();
            broadcastClientJSON(roomData, wss, ws);
            break;
        case "createUser":
            try {
                users.createUser(data.user.nick);
            } catch (error) {
                broadcastClientJSON({
                    type: "connection",
                    status: false,
                    nick: data.user.nick,
                    users: users.users
                }, wss, ws);
                break;
            }
            broadcastClientJSON({
                type: "connection",
                status: true,
                nick: data.user.nick,
                users: users.users
            }, wss, ws);
            ws.nick = data.user.nick;
            updateRoomData();
            broadcastAllJSON({
                type: "userList",
                users: users.users
            }, wss);
            roomData.message = {
                message: "Welcome to the Gomoku chat " + data.user.nick,
                nick: "",
                time: Date.now()
            };
            roomData.type = "enterRoom";
            broadcastClientJSON(roomData, wss, ws);
            broadcastExceptJSON({
                type: "message",
                message: {
                    message: data.user.nick + " has logged in.",
                    nick: "",
                    time: Date.now()
                }
            }, wss, ws);
            break;


        case "message":
            if (data.message !== "") {
                broadcastAllJSON({
                    type: "message",
                    message: {
                        nick: data.nick,
                        message: data.message,
                        time: Date.now()
                    }
                }, wss);
            }
            break;


        case "createGame":
            board.init(data.size);
            board.start();
            updateRoomData();
            roomData.type = "gameStart";
            broadcastAllJSON(roomData, wss);
            break;


        case "placeToken":
            if (data.player === board.player) {
                try {
                    board.placeMarker(data.position.x, data.position.y);
                } catch (error) {
                    broadcastClientJSON({
                        type: "message",
                        message: {
                            message: error.message,
                            nick: "",
                            time: Date.now()
                        }
                    }, wss, ws);
                }
            }
            if (board.winner !== null) {
                // Update history with new winner
                await db.addGameData('history', board.getGameResult());
                roomData.history = await db.getHistory();
                roomData.message = {
                    message: board.winnerMsg +
                        " Great played " +
                        board.playersGame['Player' + board.winner],
                    nick: "",
                    time: Date.now()
                };
                roomData.type = "updateRoom";
                updateRoomData();
                broadcastAllJSON(roomData, wss);
                wss.clients.forEach((ws) => { delete ws.playerId; });
                board.reset();
                break;
            }
            roomData.type = "updateRoom";
            updateRoomData();
            broadcastAllJSON(roomData, wss);
            break;


        case "setPlayer":
            var status = 1;

            try {
                board.setPlayer(data.playerId, ws.nick);
            } catch (error) {
                status = 0;
            }
            ws.playerId = data.playerId;
            broadcastClientJSON({
                type: "setPlayer",
                player: data.playerId,
                status: status
            }, wss, ws);

            updateRoomData();
            roomData.type = "updateRoom";
            roomData.message = {
                nick: "",
                time: Date.now(),
                message: ws.nick + " has entered the game as Player " + data.playerId
            };
            broadcastAllJSON(roomData, wss);
            break;
        default:
    }
    roomData.message = null;
}



/**
 * Initiate server with data.
 * @return {void}
 */
async function initServer() {
    updateRoomData();
    roomData.history = await db.getHistory();
}



/**
 * Update room object with data.
 * @return {void}
 */
function updateRoomData() {
    roomData.users = users.users;
    roomData.game = {
        size: board.size,
        board: board.board,
        players: board.playersGame,
        winner: board.winner,
        winnerMsg: board.winnerMsg,
        currentPlayer: board.player,
    };
}



/**
 * Handle error
 * @param  {string} error Error message
 * @return {void}
 */
function handleError(error) {
    console.log(`Server error: ${error}`);
}



/**
 * Handle the close function.
 * @param  {string} wss   WebSocket server
 * @param  {string} ws    WebSocket
 * @return {void}
 */
async function handleClose(wss, ws) {
    users.users = users.users.filter((nick) => {
        return nick !== ws.nick;
    });
    if (ws.nick !== undefined) {
        broadcastExceptJSON({
            type: "message",
            message: {
                message: ws.nick + " has logged out.",
                nick: "",
                time: Date.now()
            }
        }, wss, ws);
        broadcastAllJSON({
            type: "userList",
            users: users.users
        }, wss);
    }

    // Player surrender then other will win
    if (ws.playerId !== undefined) {
        if (board.playerSurrender(ws.nick)) {
            await db.addGameData('history', board.getGameResult());
            roomData.history = await db.getHistory();
            broadcastExceptJSON({
                type: "message",
                message: {
                    message: "Player" + ws.playerId + " - " + ws.nick + " lost.",
                    nick: "",
                    time: Date.now()
                }
            }, wss, ws);
        }
        board.reset();
        updateRoomData();
        wss.clients.forEach((ws) => { delete ws.playerId; });
    }
    updateRoomData();
    roomData.type = "updateRoom";
    broadcastExceptJSON(roomData, wss);
}



/**
 * Broadcast to client as JSON
 * @param  {object} data Data object.
 * @param  {object} wss  WebSocket object.
 * @param  {object} ws   WebSocket connection object.
 * @return {void}
 */
function broadcastClientJSON(data, wss, ws) {
    wss.broadcastClient(ws, JSON.stringify(data));
}



/**
 * Broadcast to all as JSON
 * @param  {object} data Data object.
 * @param  {object} wss  WebSocket object.
 * @return {void}
 */
function broadcastAllJSON(data, wss) {
    wss.broadcastAll(JSON.stringify(data));
}



/**
 * Broadcast to all except sender.
 * @param  {object} data Data object.
 * @param  {object} wss  WebSocket object.
 * @param  {object} ws   WebSocket connection object.
 * @return {void}
 */
function broadcastExceptJSON(data, wss, ws) {
    wss.broadcastExcept(ws, JSON.stringify(data));
}



/**
 * GomokuServer object
 * @param  {object} httpServer HttpServer object.
 * @return {object}            GomokuServer object.
 */
const gomokuServer = (httpServer) => {
    initServer();
    return {
        server: wsServer({
            server: httpServer,
            handleMessage: handleMessage,
            handleError: handleError,
            handleClose: handleClose
        }),
    };
};

module.exports = gomokuServer;
