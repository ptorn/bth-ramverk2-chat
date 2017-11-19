"use strict";

const assert = require("assert");
const mocha = require('mocha');
const describe = mocha.describe;
const it = mocha.it;
const createUser = require("../../src/user/user");

describe("Test User module", () => {
    it("Users full name.", () => {
        let testUser = createUser({userName: "Kungen", firstName: "John", lastName: "Doe"});

        assert.equal(testUser.getUserFullName(), "John Doe");
    });
});
