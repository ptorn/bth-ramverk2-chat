"use strict";

let users = {
    users: [],

    /**
     * Create user
     * @param  {string} user username
     * @return {void}
     */
    createUser: function(user) {
        if (user === "") {
            throw Error("Nickname is empty.");
        }
        if (this.users.indexOf(user) !== -1) {
            throw Error("Nickname is already taken!");
        }
        this.users.push(user);
        console.log("User %s is created", user);
    }
};

module.exports = users;
