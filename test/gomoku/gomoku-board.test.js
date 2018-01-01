const mocha = require('mocha');
const chai = require('chai');
const describe = mocha.describe;
const before = mocha.before;
const beforeEach = mocha.beforeEach;

const it = mocha.it;
const board = require('../../src/gomoku/gomoku-board');
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
            expect(board.placeMarker(5, 5)).to.be.true;
            expect(board.board[55]).to.equal(1);
            expect(() => { board.placeMarker(11, 11); }).to.throw();
        });
        it('Place a marker on a taken spot.', () => {
            expect(() => { board.placeMarker(5, 5); }).to.throw();
        });
        it('Check next player.', () => {
            expect(board.player).to.equal(2);
            expect(board.placeMarker(5, 6)).to.be.true;
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

            board.checkWinner(9, 8);
            expect(board.checkWinner(9, 9)).to.be.true;
            expect(board.winner).to.equal('No winner!');
        });
    });
});
