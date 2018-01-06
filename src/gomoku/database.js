"use strict";

const dbGomoku = (database) => {
    const db = require('bth-mongodb-crud')(database);

    return {
        getHistory: async function() {
            return await db.findInCollection("history", {}, {});
        },
        addGameData: async function(collection, game) {
            try {
                if (typeof game === 'undefined') {
                    throw Error("Undefined game variable");
                }
                await db.insert("history", {
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
        reset: async function(collection) {
            await db.empty(collection);
        }
    };
};

module.exports = dbGomoku;
