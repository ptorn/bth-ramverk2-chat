"use strict";

const assert = require("assert");
const mocha = require('mocha');
const describe = mocha.describe;
const it = mocha.it;
const Client = require("../../src/client/Client");

describe("Test Client", () => {
    it("Clients full name", () => {
        let testClient = new Client("TheChamp", "John", "Doe");

        assert.equal(testClient.getUserFullname(), "John Doe");
    });
});
