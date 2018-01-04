"use strict";

const gomokuController = {
    create: function(req, res) {
        req.board.init(req.params['size']);
        req.board.start();

        res.json({
            'nextPlayer': req.board.player,
            'board': req.board.board,
            'winner': req.board.winner
        });
    },
    place: function(req, res) {
        req.board.placeMarker(parseInt(req.params['xValue']), parseInt(req.params['yValue']));
        res.json({
            'nextPlayer': req.board.player,
            'board': req.board.board,
            'winner': req.board.winner
        });
    }
};

module.exports = gomokuController;
