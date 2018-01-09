const mocha = require('mocha');
const chai = require('chai');
const describe = mocha.describe;
const before = mocha.before;
const beforeEach = mocha.beforeEach;
const it = mocha.it;
const board = require('../../src/gomoku/board');
const expect = chai.expect;

describe('Test Gomoku Board.', function () {
    before(() => {
        board.reset();
        board.init(10);
        board.start();
    });
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
        beforeEach(() => {
            board.reset();
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
            expect(board.placeMarker(5, 5)).to.equal(true);
            expect(board.board[55]).to.equal(1);
            expect(() => { board.placeMarker(11, 11); }).to.throw();
        });
        it('Place a marker on a taken spot.', () => {
            board.placeMarker(5, 5);
            expect(() => { board.placeMarker(5, 5); }).to.throw();
        });
        it('Check next player.', () => {
            expect(board.player).to.equal(1);
            expect(board.placeMarker(5, 6)).to.equal(true);
            expect(board.player).to.equal(2);
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
            expect(board.playerSurrender("Jane")).to.equal(false);
        });
        it('PlayerSurrender player1.', () => {
            expect(board.playerSurrender("Joe")).to.equal(true);
        });
        it('PlayerSurrender player1 but player2 is null', () => {
            board.playersGame.Player2 = null;
            expect(board.playerSurrender("Joe")).to.equal(false);
        });
        it('PlayerSurrender player2 but player1 is null', () => {
            board.playersGame.Player1 = null;
            expect(board.playerSurrender("James")).to.equal(false);
        });
        it('PlayerSurrender player2.', () => {
            expect(board.playerSurrender("James")).to.equal(true);
        });
    });
});
