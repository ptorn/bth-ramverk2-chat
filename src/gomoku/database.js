"use strict";
const db = require('bth-mongodb-crud')('gomoku');

const dbGomoku = {
    getHistory: async function () {
        let history = [];

        try {
            history = await db.findInCollection("history", {}, {});
        } catch (error) {
            history = ['empty'];
        }
        return history;
    },
    addGameHistory: async function (game) {
        try {
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
            console.log(error);
        }
    }
};

module.exports = dbGomoku;
