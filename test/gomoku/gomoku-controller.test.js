const request = require('supertest');
const app = require('../../app.js');
const mocha = require('mocha');
const describe = mocha.describe;

const it = mocha.it;

describe('Test Gomoku Controller.', function () {
    describe('Create board.', () => {
        it('Inititate a board.', (done) => {
            request(app)
                .get('/api/gomoku/create/10')
                .expect(200, done);
        });
        // it('Place a mark.', (done) => {
        //     request(app)
        //         .get('/api/gomoku/place/5/5')
        //         .expect(200, done);
        // });
    });
});
