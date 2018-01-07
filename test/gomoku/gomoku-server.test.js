const mocha = require('mocha');
const chai = require('chai');
const describe = mocha.describe;
// const beforeEach = mocha.beforeEach;
const before = mocha.before;
const after = mocha.after;

// const afterEach = mocha.afterEach;
const WebSocket = require("ws");
const it = mocha.it;
const expect = chai.expect;
const app = require('express')();
const http = require('http');
const server = http.createServer(app);
const gomokuServer = require('../../src/gomoku/gomoku-server');

describe('Test Web Socket.', function () {
    before((done) => {
        gomokuServer(server);
        server.listen(3000, done);
    });
    after((done) => {
        server.close();
        done();
    });
    describe('Gomoku ws-server.', () => {
        it('Create user', (done) => {
            let ws = new WebSocket("ws://127.0.0.1:3000", "json");

            ws.onopen = () => {
                expect(ws.readyState).to.equal(ws.OPEN);
                ws.send(JSON.stringify({
                    type: "createUser",
                    user: {
                        nick: "Test"
                    }
                }));
            };
            ws.onmessage = (evt) => {
                let data = JSON.parse(evt.data);

                if (data.type === "userList") {
                    expect(data.type).to.equal("userList");
                }
                if (data.type === "enterRoom") {
                    expect(data.type).to.equal("enterRoom");
                }
            };
            done();
        });
        it('Send message websocket', async (done) => {
            let ws = new WebSocket("ws://127.0.0.1:3000", "json");

            ws.onopen = () => {
                ws.send(JSON.stringify({
                    type: "message",
                    nick: "Hej",
                    message: "Test"
                }));
                // done();
            };
            ws.onmessage = (evt) => {
                let data = JSON.parse(evt.data);

                expect(data.type).to.equal("message");
                expect(data.message).to.equal("Tes");
                // done();
            };
            done();
        });
        it('Create game websocket', (done) => {
            let ws = new WebSocket("ws://127.0.0.1:3000", "json");

            ws.onopen = function () {
                ws.send(JSON.stringify({
                    type: "createGame",
                    size: 10
                }));
            };
            done();
        });
        it('Set player websocket', (done) => {
            let ws = new WebSocket("ws://127.0.0.1:3000", "json");

            ws.onopen = function () {
                ws.send(JSON.stringify({
                    type: "setPlayer",
                    playerId: 1
                }));
            };
            done();
        });
        it('Place token websocket', (done) => {
            let ws = new WebSocket("ws://127.0.0.1:3000", "json");

            ws.onopen = function () {
                ws.send(JSON.stringify({
                    type: "placeToken",
                    player: 1,
                    position: {
                        x: 0,
                        y: 0
                    }
                }));
            };
            done();
        });
        it('Place token for winner websocket', (done) => {
            let ws = new WebSocket("ws://127.0.0.1:3000", "json");

            // gomokuServer.board.winner = 1;
            ws.onopen = function () {
                ws.send(JSON.stringify({
                    type: "placeToken",
                    player: 1,
                    position: {
                        x: 0,
                        y: 0
                    }
                }));
            };
            done();
        });
    });
});
