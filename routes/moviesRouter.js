const express = require('express')
const router = express.Router()
const movieCtrl = require('../controllers/moviesController')

// Create 'Movie'
router.post('/', movieCtrl.create)
// Index 'Movies'
router.get('/', movieCtrl.index)
// Show 'Movie'
router.get('/:id', movieCtrl.show)
// Create 'Performer'
router.post('/:movieId/performers/:performerId', movieCtrl.addPerformer)

module.exports = router