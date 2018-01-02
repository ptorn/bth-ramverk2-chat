"use strict";

let board = {
    size: null,
    board: [],
    player: 0,
    winner: null,
    playersGame: {
        Player1: null,
        Player2: null
    },


    /**
     * Initiate board.
     * @param  {integer} squares Nr squares in X range
     * @return {void}
     */
    init: function(squares) {
        if (squares < 10 || squares > 99) {
            throw new Error('Unsupported size.');
        }
        this.size = squares;
        this.winner = null;
        this.generateBoard();
    },



    /**
     * Generate board and fill with 0.
     * @return {void}
     */
    generateBoard: function() {
        this.board.length = this.size * this.size;
        this.board.fill(0);
    },


    /**
     * Start game and set next player.
     * @return {void}
     */
    start: function() {
        this.player = 1;
    },



    /**
     * Reset the game.
     * @return {void}
     */
    reset: function() {
        this.board = [];
        this.player = 0;
        this.winner = null;
    },



    /**
     * Get position in array from the koordinates from the board.
     * @param  {integer} x X-value
     * @param  {integer} y Y-value
     * @return {void}
     */
    getPosition: function(x, y) {
        if (this.positionOnBoard(x, y)) {
            return x + y * this.size;
        }
        throw new Error('Position is outside.');
    },



    /**
     * Check if position is on the board.
     * @param  {integer} x X-value
     * @param  {integer} y Y-value
     * @return {boolean}   True or false if value is on board.
     */
    positionOnBoard: function(x, y) {
        return x < this.size && x >= 0 && y < this.size && y >= 0;
    },



    /**
     * Place a marker on the board.
     * @param  {integer} x X-value
     * @param  {integer} y Y-value
     * @return {boolean}   Return true or false if it worked.
     */
    placeMarker: function(x, y) {
        if (this.winner != null) {
            throw new Error('Game is over.');
        }
        let position = this.getPosition(x, y);

        if (this.isPositionTaken(position)) {
            throw new Error('Position is taken.');
        }
        this.board[position] = this.player;
        if (this.checkWinner(x, y)) {
            return false;
        }
        this.changePlayer();
        return true;
    },



    /**
     * Check if position is taken.
     * @param  {integer} position Position in the board array.
     * @return {boolean}          Return true or false if position is taken.
     */
    isPositionTaken: function(position) {
        return this.board[position] !== 0 ? true: false;
    },



    /**
     * Change players turn.
     * @return {boolean} Returns true when changed.
     */
    changePlayer: function() {
        if (this.player === 1) {
            this.player = 2;
            return true;
        }
        this.player = 1;
        return true;
    },



    /**
     * Check if board is full of markers.
     * @return {boolean} True if board is full else false.
     */
    isBoardFull: function() {
        const filtered = this.board.filter((item) => {
            return item != 0;
        });

        return this.board.length === filtered.length;
    },



    /**
     * Check if last placed token is a winner.
     * @param  {integer} x X-value
     * @param  {integer} y Y-value
     * @return {boolean}   Return true if winner. No winner returns false.
     */
    checkWinner: function(x, y) {
        let curPosition = this.getPosition(x, y);
        let checkRow = (xStep, yStep) => {
            let step = 0;
            let row = [];
            let checkSquare = (step, row) => {
                if (step === 5) {
                    return row;
                }
                let nextX = x + xStep * step;
                let nextY = y + yStep * step;

                if (nextX < 0 || nextY < 0 || nextX >= this.size || nextY >= this.size) {
                    return row;
                }
                let nextPos = this.getPosition(nextX, nextY);

                if (this.board[nextPos] === this.board[curPosition]) {
                    row.push(nextPos);
                } else {
                    return row;
                }
                row = checkSquare(step + 1, row);
            };

            checkSquare(step, row);
            return row;
        };

        switch (true) {
            case (checkRow(1, 0).length + checkRow(-1, 0).length) >= 6:
                this.winner = "Player " + this.player + " is the winner!";
                return true;
            case (checkRow(0, 1).length + checkRow(0, -1).length) >= 6:
                this.winner = "Player " + this.player + " is the winner!";
                return true;
            case (checkRow(1, 1).length + checkRow(-1, -1).length) >= 6:
                this.winner = "Player " + this.player + " is the winner!";
                return true;
            case (checkRow(-1, 1).length + checkRow(1, -1).length) >= 6:
                this.winner = "Player " + this.player + " is the winner!";
                return true;
            case this.isBoardFull() === true:
                this.winner = "No winner!";
                return true;
            default:
                return false;
        }
    },

    setPlayer: function(id, nick) {
        if (this.playersGame['Player' + id] === null &&
            Object.values(this.playersGame).indexOf(nick) === -1) {
            this.playersGame['Player' + id] = nick;
            return id;
        } else {
            throw new Error("Could not set player.");
        }
    }
};

module.exports = board;
