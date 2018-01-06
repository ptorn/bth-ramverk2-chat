const mocha = require('mocha');
const chai = require('chai');
const describe = mocha.describe;
const it = mocha.it;
const database = require('../../src/gomoku/database')('test');
const expect = chai.expect;
const beforeEach = mocha.beforeEach;

describe('Test gomoku database model', function () {
    beforeEach(async function() {
        await database.reset('history');
        await database.addGameData('history', {
            player1: {
                player: 1,
                nick: "James",
                status: "winner",
            },
            player2: {
                player: 2,
                nick: "Joe",
                status: "looser",
            }
        });
    });

    describe('Check db model methods', () => {
        it('Get history', async function() {
            let result = await database.getHistory();

            expect(result[0].player1.player).to.equal(1);
        });
        it('Add history', async function() {
            let result = await database.getHistory();

            expect(result[1]).to.equal(undefined);
            await database.addGameData('history', {
                player1: {
                    player: 2,
                    nick: "James",
                    status: "looser",
                },
                player2: {
                    player: 1,
                    nick: "Joe",
                    status: "winner",
                }
            });

            result = await database.getHistory();
            expect(result[1].player1.player).to.equal(2);
        });
        it('Get from empty history', async function() {
            const db = require('../../src/gomoku/database')('sss');

            await database.reset('history');
            let result = await db.getHistory();

            expect(result[0]).to.equal(undefined);
        });

        it('Try to add faulty data.', async function() {
            try {
                await database.addGameData('history');
            } catch (error) {
                expect(error.message).to.equal('Error: Undefined game variable');
            }
        });
    });
});
