const express = require('express')
const router = express.Router()

/*
const {

} = require('../controllers/game')
*/

router.route('/').post((req, res) => {
    res.json({"users": ["userOne", "userTwo", "userThree"]})
});

router.route('/').patch((req, res) => {
    res.json({"users": ["userOne", "userTwo", "userThree"]})
});

module.exports = router