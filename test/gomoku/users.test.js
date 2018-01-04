"use strict";

const mocha = require('mocha');
const describe = mocha.describe;
const chai = require('chai');
const expect = chai.expect;
const it = mocha.it;
const users = require("../../src/gomoku/users");

describe("Test Gomoku User module", () => {
    it("Test so empty first.", () => {
        expect(users.users.length).to.equal(0);
    });
    it('Add a user.', () => {
        users.createUser("James");
        expect(users.users.length).to.equal(1);
        expect(users.users[0]).to.equal('James');
    });
    it('Test to add user twice.', () => {
        expect(() => { users.createUser("James");}).to.throw();
    });
    it('Test to add empty username.', () => {
        expect(() => { users.createUser(""); }).to.throw();
    });
});
