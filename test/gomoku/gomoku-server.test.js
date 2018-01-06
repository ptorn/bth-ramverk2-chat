const mocha = require('mocha');
// const chai = require('chai');
const describe = mocha.describe;
const before = mocha.before;
const after = mocha.after;
var http = require('http');
const WebSocket = require("ws");

const it = mocha.it;
const gomokuServer = require('../../src/gomoku/gomoku-server');
// const expect = chai.expect;
let server;

describe('Test Web Socket.', function () {
    before(function(done) {
        server = http.createServer();
        server.listen(8080, done);
        gomokuServer(server);
    });
    after((done) => {
        server.close(done);
        done();
    });
    describe('Create user.', () => {
        it('Send to websocket', (done) => {
            let client = new WebSocket("ws://127.0.0.1:8080", "json");

            // client.send(JSON.stringify({
            //     type: "createUser",
            //     user: {
            //         nick: "Test"
            //     }
            // }));
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
            done();
        });
    });
});
