"use strict";

/**
 * A user module.
 *
 * @module
 */

class User {
    /**
     * @constructor
     *
     * @param userName
     * @param firstName
     * @param lastName
     */
    constructor(userName, firstName, lastName) {
        this.userName = userName;
        this.firstName = firstName;
        this.lastName = lastName;
    }



    /**
     * Get the full users name.
     * @return {string} First and lastname.
     */
    getUserFullName() {
        return this.firstName + " " + this.lastName;
    }
}
module.exports = User;
