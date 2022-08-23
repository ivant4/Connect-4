const express = require('express')
const router = express.Router()


const {
    createNewGame,
    getGameStatus,
    setGameStatus
} = require('../controllers/game')

// The host player creates a game
router.route('/').post(createNewGame);

// The host player is getting update on game status
router.route('/').get(getGameStatus);

// A player joining or leaving the game
router.route('/').patch(setGameStatus);

module.exports = router;