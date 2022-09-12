const express = require('express');
const router = express.Router();

const {
    getBoardState,
    setBoardState
} = require('../controllers/game');

// A player is retrieving the board state and 
// waiting for their move
router.route('/').get(getBoardState);

// A player is updating the board state after a move
router.route('/').patch(setBoardState);

module.exports = router;