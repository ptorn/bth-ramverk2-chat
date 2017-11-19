"use strict";

const assert = require("assert");
const mocha = require('mocha');
const describe = mocha.describe;
const it = mocha.it;
const User = require("../../src/user/user");

describe("Test User module", () => {
    it("Users full name.", () => {
        let testUser = new User("TheChamp", "John", "Doe");

        assert.equal(testUser.getUserFullName(), "John Doe");
    });
});
