"use strict";

/**
 * Create a User
 * @param  {string} userName  username
 * @param  {string} firstName firstname
 * @param  {string} lastName  lastname
 * @return {object}           a user.
 */
const createUser = ({userName, firstName, lastName}) => ({
    userName,
    firstName,
    lastName,
    getUserFullName() {
        return firstName + " " + lastName;
    }
});

module.exports = createUser;
