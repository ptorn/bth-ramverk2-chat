const mocha = require('mocha');
const chai = require('chai');
const describe = mocha.describe;
const beforeEach = mocha.beforeEach;
const it = mocha.it;
const board = require('../../src/gomoku/board');
const expect = chai.expect;

describe('Test Gomoku gameplay.', function () {
    describe('Game play', () => {
        beforeEach(() => {
            board.reset();
            board.init(10);
            board.start();
        });
        it('Check winner, when 5 in a row Y-line', () => {
            expect(board.placeMarker(1, 1)).to.equal(true);
            expect(board.placeMarker(2, 1)).to.equal(true);

            expect(board.placeMarker(1, 2)).to.equal(true);
            expect(board.placeMarker(2, 2)).to.equal(true);

            expect(board.placeMarker(1, 3)).to.equal(true);
            expect(board.placeMarker(2, 3)).to.equal(true);

            expect(board.placeMarker(1, 4)).to.equal(true);
            expect(board.placeMarker(2, 4)).to.equal(true);

            expect(board.placeMarker(1, 5)).to.equal(false);
            expect(() => { board.placeMarker(2, 5); }).to.throw();
        });
        it('Check winner, when 5 in a row X-line', () => {
            expect(board.placeMarker(1, 1)).to.equal(true);
            expect(board.placeMarker(1, 2)).to.equal(true);

            expect(board.placeMarker(2, 1)).to.equal(true);
            expect(board.placeMarker(2, 2)).to.equal(true);

            expect(board.placeMarker(3, 1)).to.equal(true);
            expect(board.placeMarker(3, 2)).to.equal(true);

            expect(board.placeMarker(4, 1)).to.equal(true);
            expect(board.placeMarker(4, 2)).to.equal(true);

            expect(board.placeMarker(5, 1)).to.equal(false);
            expect(() => { board.placeMarker(5, 2); }).to.throw();
        });
        it('Check winner, when 5 in a row Minor', () => {
            expect(board.placeMarker(5, 5)).to.equal(true);
            expect(board.placeMarker(1, 2)).to.equal(true);

            expect(board.placeMarker(4, 4)).to.equal(true);
            expect(board.placeMarker(2, 2)).to.equal(true);

            expect(board.placeMarker(3, 3)).to.equal(true);
            expect(board.placeMarker(3, 2)).to.equal(true);

            expect(board.placeMarker(6, 6)).to.equal(true);
            expect(board.placeMarker(4, 2)).to.equal(true);

            expect(board.placeMarker(7, 7)).to.equal(false);
            expect(() => { board.placeMarker(5, 2); }).to.throw();
        });
        it('Check winner, when 5 in a row Major', () => {
            expect(board.placeMarker(5, 5)).to.equal(true);
            expect(board.placeMarker(1, 2)).to.equal(true);

            expect(board.placeMarker(6, 4)).to.equal(true);
            expect(board.placeMarker(2, 2)).to.equal(true);

            expect(board.placeMarker(7, 3)).to.equal(true);
            expect(board.placeMarker(3, 2)).to.equal(true);

            expect(board.placeMarker(4, 6)).to.equal(true);
            expect(board.placeMarker(4, 2)).to.equal(true);

            expect(board.placeMarker(3, 7)).to.equal(false);
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

            expect(board.checkWinner(9, 9)).to.equal(true);
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

            expect(board.checkWinner(9, 9)).to.equal(true);
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
            expect(board.checkWinner(0, 9)).to.equal(true);
            expect(board.getGameResult()).to.deep.equal(result);
        });
    });
});
