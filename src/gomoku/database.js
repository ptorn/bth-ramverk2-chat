"use strict";

const dbGomoku = (database) => {
    const db = require('bth-mongodb-crud')(database);

    return {

        /**
         * Get game history
         * @return {array} Array of game history objects.
         */
        getHistory: async function() {
            return await db.findInCollection("history", {}, {});
        },


        /**
         * Add game data.
         * @param  {string} collection Name of collection.
         * @param  {object} game       Object with data to store about a game.
         * @return {void}
         */
        addGameData: async function(collection, game) {
            try {
                if (typeof game === 'undefined') {
                    throw Error("Undefined game variable");
                }
                await db.insert(collection, {
                    player1: {
                        player: game.player1.player,
                        nick: game.player1.nick,
                        status: game.player1.status,
                    },
                    player2: {
                        player: game.player2.player,
                        nick: game.player2.nick,
                        status: game.player2.status,
                    }
                });
            } catch (error) {
                throw Error(error);
            }
        },



        /**
         * Reset
         * @param  {string} collection  Name of collection.
         * @return {void}
         */
        reset: async function(collection) {
            await db.empty(collection);
        }
    };
};

module.exports = dbGomoku;
