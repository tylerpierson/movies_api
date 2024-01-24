const express = require('express')
const router = express.Router()
const performerCtrl = require('../controllers/performersController')

// GET /performers: returns a list of all performers
router.get('/', performerCtrl.index)
// POST /performers: Accepts performer data and creates a new performer
router.post('/', performerCtrl.create)

module.exports = router