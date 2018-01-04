const mocha = require('mocha');
// const chai = require('chai');
const describe = mocha.describe;
const before = mocha.before;
const after = mocha.after;
var http = require('http');
const WebSocket = require("ws");

const it = mocha.it;
const gomokuServer = require('../../src/gomoku/ws-server');
// const expect = chai.expect;
const app = require('../../app');

app.set('port', 8080);
var server = http.createServer(app);

describe('Test Web Socket.', function () {
    before(() => {
        server.listen(8080);
        gomokuServer(server);
    });
    after(() => {
        server.close();
    });
    describe('Create user.', () => {
        it('Send to websocket', () => {
            let client = new WebSocket("ws://localhost:8080", "json");

            if (client.readyState != client.OPEN) {
                console.error('Client state is ' + client.readyState);
            } else {
                client.send(JSON.stringify({
                    type: "createUser",
                    user: {
                        nick: "Test"
                    }
                }));
            }
        });
        it('Send message.', () => {
            let client = new WebSocket("ws://localhost:8080", "json");

            if (client.readyState != client.OPEN) {
                console.error('Client state is ' + client.readyState);
            } else {
                client.send(JSON.stringify({
                    type: "message",
                    nick: "Test",
                    message: "Hejsan"
                }));
            }
        });
    });
});
