const mocha = require('mocha');
const chai = require('chai');
const describe = mocha.describe;
const before = mocha.before;
const beforeEach = mocha.beforeEach;

const it = mocha.it;
const board = require('../../src/gomoku/board');
const expect = chai.expect;

describe('Test Gomoku Board.', function () {
    describe('Create board.', () => {
        it('Inititate a board.', () => {
            board.init(10);
            expect(board).to.be.an('object');
            expect(board.size).to.equal(10);
            expect(board.board.length).to.equal(100);
        });
        it('Wrong size, throw error.', () => {
            expect(() => { board.init(5); }).to.throw();
        });
    });
    describe('Player data', () => {
        it('Before Set Player', () => {
            expect(board.playersGame.Player1).to.equal(null);
        });
        it('Check Set Player return.', () => {
            let value = board.setPlayer(1, "James");

            expect(value).to.equal(1);
        });
        it('Check added player.', () => {
            expect(board.playersGame.Player1).to.equal("James");
        });
        it('Try to add user when no space.', () => {
            expect(() => {board.setPlayer(1, "James");}).to.throw();
        });
    });
    describe('Board methods.', () => {
        before(() => {
            board.init(10);
            board.start();
        });
        it('Find position.', () => {
            expect(board.getPosition(5, 5)).to.equal(55);
        });
        it('Throw error if outside.', () => {
            expect(() => { board.getPosition(11, 10); }).to.throw();
            expect(() => { board.getPosition(-1, 10); }).to.throw();
            expect(() => { board.getPosition(11, -1); }).to.throw();
            expect(() => { board.getPosition(1, 11); }).to.throw();
        });
        it('Place a marker.', () => {
            let placed = board.placeMarker(5, 5);

            expect(placed).to.be.true;
            expect(board.board[55]).to.equal(1);
            expect(() => { board.placeMarker(11, 11); }).to.throw();
        });
        it('Place a marker on a taken spot.', () => {
            expect(() => { board.placeMarker(5, 5); }).to.throw();
        });
        it('Check next player.', () => {
            let placed = board.placeMarker(5, 6);

            expect(board.player).to.equal(2);
            expect(placed).to.be.true;
            expect(board.player).to.equal(1);
        });
    });
    describe('Game play', () => {
        beforeEach(() => {
            board.reset();
            board.init(10);
            board.start();
        });
        it('Check winner, when 5 in a row Y-line', () => {
            expect(board.placeMarker(1, 1)).to.be.true;
            expect(board.placeMarker(2, 1)).to.be.true;

            expect(board.placeMarker(1, 2)).to.be.true;
            expect(board.placeMarker(2, 2)).to.be.true;

            expect(board.placeMarker(1, 3)).to.be.true;
            expect(board.placeMarker(2, 3)).to.be.true;

            expect(board.placeMarker(1, 4)).to.be.true;
            expect(board.placeMarker(2, 4)).to.be.true;

            expect(board.placeMarker(1, 5)).to.be.false;
            expect(() => { board.placeMarker(2, 5); }).to.throw();
        });
        it('Check winner, when 5 in a row X-line', () => {
            expect(board.placeMarker(1, 1)).to.be.true;
            expect(board.placeMarker(1, 2)).to.be.true;

            expect(board.placeMarker(2, 1)).to.be.true;
            expect(board.placeMarker(2, 2)).to.be.true;

            expect(board.placeMarker(3, 1)).to.be.true;
            expect(board.placeMarker(3, 2)).to.be.true;

            expect(board.placeMarker(4, 1)).to.be.true;
            expect(board.placeMarker(4, 2)).to.be.true;

            expect(board.placeMarker(5, 1)).to.be.false;
            expect(() => { board.placeMarker(5, 2); }).to.throw();
        });
        it('Check winner, when 5 in a row Minor', () => {
            expect(board.placeMarker(5, 5)).to.be.true;
            expect(board.placeMarker(1, 2)).to.be.true;

            expect(board.placeMarker(4, 4)).to.be.true;
            expect(board.placeMarker(2, 2)).to.be.true;

            expect(board.placeMarker(3, 3)).to.be.true;
            expect(board.placeMarker(3, 2)).to.be.true;

            expect(board.placeMarker(6, 6)).to.be.true;
            expect(board.placeMarker(4, 2)).to.be.true;

            expect(board.placeMarker(7, 7)).to.be.false;
            expect(() => { board.placeMarker(5, 2); }).to.throw();
        });
        it('Check winner, when 5 in a row Major', () => {
            expect(board.placeMarker(5, 5)).to.be.true;
            expect(board.placeMarker(1, 2)).to.be.true;

            expect(board.placeMarker(6, 4)).to.be.true;
            expect(board.placeMarker(2, 2)).to.be.true;

            expect(board.placeMarker(7, 3)).to.be.true;
            expect(board.placeMarker(3, 2)).to.be.true;

            expect(board.placeMarker(4, 6)).to.be.true;
            expect(board.placeMarker(4, 2)).to.be.true;

            expect(board.placeMarker(3, 7)).to.be.false;
            expect(() => { board.placeMarker(5, 2); }).to.throw();
        });
        it('Board is full with no winner', () => {
            board.board = [];
            board.board.push(1, 2, 1, 2, 1, 2, 1, 2, 1, 2);
            board.board.push(2, 1, 2, 1, 2, 1, 2, 1, 2, 1);
            board.board.push(2, 1, 2, 1, 2, 1, 2, 1, 2, 1);
            board.board.push(2, 1, 2, 1, 2, 1, 2, 1, 2, 1);
            board.board.push(2, 1, 2, 1, 2, 1, 2, 1, 2, 1);
            board.board.push(1, 2, 1, 2, 1, 2, 1, 2, 1, 2);
            board.board.push(1, 2, 1, 2, 1, 2, 1, 2, 1, 2);
            board.board.push(1, 2, 1, 2, 1, 2, 1, 2, 1, 2);
            board.board.push(2, 1, 2, 1, 2, 1, 2, 1, 2, 1);
            board.board.push(1, 2, 1, 2, 1, 2, 1, 2, 1, 2);

            expect(board.checkWinner(9, 9)).to.be.true;
            expect(board.winnerMsg).to.equal('No winner!');
        });
        it('Get game result. Player2 won.', () => {
            board.board = [];
            board.board.push(1, 2, 1, 2, 1, 2, 1, 2, 1, 2);
            board.board.push(2, 1, 2, 1, 2, 1, 2, 1, 2, 1);
            board.board.push(2, 1, 2, 1, 2, 1, 2, 1, 2, 1);
            board.board.push(2, 1, 2, 1, 2, 1, 2, 1, 2, 1);
            board.board.push(2, 1, 2, 1, 2, 1, 2, 1, 2, 1);
            board.board.push(1, 2, 1, 2, 1, 2, 1, 2, 1, 2);
            board.board.push(1, 2, 1, 2, 1, 2, 1, 2, 1, 2);
            board.board.push(1, 2, 1, 2, 1, 2, 1, 2, 1, 2);
            board.board.push(2, 1, 2, 1, 2, 1, 2, 1, 2, 2);
            board.board.push(1, 2, 1, 2, 1, 2, 1, 2, 1, 2);
            board.playersGame.Player2 = "James";
            board.playersGame.Player1 = "Joe";
            board.player = 2;
            let result = {
                player1: {
                    player: 1,
                    nick: "Joe",
                    status: "looser"
                },
                player2: {
                    player: 2,
                    nick: "James",
                    status: "winner"
                }
            };

            expect(board.checkWinner(9, 9)).to.be.true;
            expect(board.getGameResult()).to.deep.equal(result);
        });
        it('Get game result. Player1 won.', () => {
            board.board = [];
            board.board.push(1, 2, 1, 2, 1, 2, 1, 2, 1, 2);
            board.board.push(2, 1, 2, 1, 2, 1, 2, 1, 2, 1);
            board.board.push(2, 1, 2, 1, 2, 1, 2, 1, 2, 1);
            board.board.push(2, 1, 2, 1, 2, 1, 2, 1, 2, 1);
            board.board.push(2, 1, 2, 1, 2, 1, 2, 1, 2, 1);
            board.board.push(1, 2, 1, 2, 1, 2, 1, 2, 1, 2);
            board.board.push(1, 2, 1, 2, 1, 2, 1, 2, 1, 2);
            board.board.push(1, 2, 1, 2, 1, 2, 1, 2, 1, 2);
            board.board.push(1, 1, 2, 1, 2, 1, 2, 1, 2, 2);
            board.board.push(1, 2, 1, 2, 1, 1, 1, 1, 1, 1);

            board.playersGame.Player2 = "James";
            board.playersGame.Player1 = "Joe";

            let result = {
                player1: {
                    player: 1,
                    nick: "Joe",
                    status: "winner"
                },
                player2: {
                    player: 2,
                    nick: "James",
                    status: "looser"
                }
            };

            board.player = 1;
            expect(board.checkWinner(0, 9)).to.be.true;
            expect(board.getGameResult()).to.deep.equal(result);
        });
    });
    describe('Player handle', () => {
        beforeEach(() => {
            board.reset();
            board.init(10);
            board.start();
            board.playersGame.Player2 = "James";
            board.playersGame.Player1 = "Joe";
        });
        it('PlayerSurrender that is not a player.', () => {
            expect(board.playerSurrender("Jane")).to.be.false;
        });
        it('PlayerSurrender player1.', () => {
            expect(board.playerSurrender("Joe")).to.be.true;
        });
        it('PlayerSurrender player1 but player2 is null', () => {
            board.playersGame.Player2 = null;
            expect(board.playerSurrender("Joe")).to.be.false;
        });
        it('PlayerSurrender player2 but player1 is null', () => {
            board.playersGame.Player1 = null;
            expect(board.playerSurrender("James")).to.be.false;
        });
        it('PlayerSurrender player2.', () => {
            expect(board.playerSurrender("James")).to.be.true;
        });
    });
});
