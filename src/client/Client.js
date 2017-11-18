"use strict";

class Client  {
    constructor(username, firstname, lastname) {
        this.username = username;
        this.firstname = firstname;
        this.lastname = lastname;
    }

    getUserFullname() {
        return this.firstname + " " + this.lastname;
    }
}

module.exports = Client;
