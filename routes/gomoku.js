"use strict";

const express = require('express');
const router = express.Router();
const gomokuController = require('../src/gomoku/gomoku-controller');
const board = require('../src/gomoku/gomoku-board');

router.use(function (req, res, next) {
    req.board = board;
    next();
});
router.get('/create/:size', (req, res) => {
    gomokuController.create(req, res);
});
router.get('/place/:xValue/:yValue', (req, res) => {
    gomokuController.place(req, res);
});
module.exports = router;
