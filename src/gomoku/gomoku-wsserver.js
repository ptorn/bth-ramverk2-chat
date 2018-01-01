"use strict";

const wsServer = require("../websocket/ws-server");
const board = require('../gomoku/gomoku-board');

let users = {
    type: "usersList",
    users: []
};

let playersGame = {
    Player1: null,
    Player2: null
};


/**
 * Handle message
 * @param  {object} message Message object.
 * @param  {object} wss     WebSocket object.
 * @param  {object} ws      WebSocket connection object.
 * @return {void}
 */
function handleMessage(message, wss, ws) {
    console.log("Received: %s", message);
    let data = JSON.parse(message);

    switch (data.type) {
        case "createUser":
            createUser(data.user.nick);
            ws.nick = data.user.nick;
            broadcastAllJSON({
                type: "userList",
                users: users.users
            }, wss);

            // Predefined data if no current game.
            var roomData = {
                type: "enterRoom",
                users: users.users,
                message: {
                    message: "Welcome to the Gomoku chat " + data.user.nick,
                    nick: "",
                    time: Date.now()
                },
                game: {
                    size: 0,
                    board: [],
                    players: {
                        Player1: null,
                        Player2: null
                    },
                    winner: null,
                    currentPlayer: null
                }
            };

            if (board.board !== null) {
                roomData = {
                    type: "enterRoom",
                    users: users.users,
                    message: {
                        message: "Welcome to the Gomoku chat " + data.user.nick,
                        nick: "",
                        time: Date.now()
                    },
                    game: {
                        size: board.size,
                        board: board.board,
                        players: playersGame,
                        winner: board.winner,
                        currentPlayer: board.player,
                    }
                };
            }
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
            broadcastAllJSON({
                type: "message",
                message: {
                    nick: data.nick,
                    message: data.message,
                    time: Date.now()
                }
            }, wss);
            break;
        case "createGame":
            playersGame = {
                Player1: null,
                Player2: null
            };
            board.init(data.size);
            board.start();
            broadcastAllJSON({
                type: "gameStart",
                size: board.size,
                board: board.board,
                players: playersGame,
                winner: board.winner
            }, wss);
            break;
        case "placeToken":
            if (data.player === board.player) {
                board.placeMarker(data.position.x, data.position.y);
            }
            broadcastAllJSON({
                type: "gamePlay",
                size: board.size,
                board: board.board,
                winner: board.winner,
                currentPlayer: board.player
            }, wss);
            if (board.winner !== null) {
                broadcastAllJSON({
                    type: "message",
                    message: {
                        message: board.winner,
                        nick: "",
                        time: Date.now()
                    }
                }, wss, ws);
            }
            break;
        case "setPlayer":
            var status = 0;

            if (playersGame['Player' + data.playerId] === null &&
                Object.values(playersGame).indexOf(ws.nick) === -1) {
                playersGame['Player' + data.playerId] = ws.nick;
                status = 1;
            }
            broadcastClientJSON({
                type: "setPlayer",
                player: data.playerId,
                status: status
            }, wss, ws);
            broadcastAllJSON({
                type: "updatePlayers",
                message: {
                    nick: "",
                    time: Date.now(),
                    message: ws.nick + " has entered the game as Player " + data.playerId
                },
                players: playersGame
            }, wss);
            break;
        default:
    }
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
 * [handleClose description]
 * @param  {string} code   Error code
 * @param  {string} reason Error reason
 * @return {void}
 */
function handleClose(wss, ws) {
    users.users = users.users.filter((nick) => {
        return nick !== ws.nick;
    });
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
    console.log("User %s has left the chat.", ws.nick);
}



/**
 * Create user
 * @param  {string} user username
 * @return {void}
 */
function createUser(user) {
    if (users.users.indexOf(user) !== -1) {
        throw Error("Nickname is already taken!");
    }
    users.users.push(user);
    console.log("User %s is created", user);
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
 * ChatServer object
 * @param  {object} httpServer HttpServer object.
 * @return {object}            ChatServer object.
 */
const gomokuServer = (httpServer) => {
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
