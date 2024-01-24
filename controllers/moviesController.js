const Movie = require('../models/movie')
const Performer = require('../models/performer')

// POST /movies: Accepts movie data and creates a movie
exports.create = async function create(req, res) {
    try {
        const createdMovie = await Movie.create(req.body)
        res.status(200).json(createdMovie)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

// GET /movies: Returns a list of ALL movies
exports.index = async function index(req, res) {
    try {
        const foundMovies = await Movie.find({})
        res.status(200).json(foundMovies)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

// GET /movies/:id: Returns an individual movie
exports.show = async function show(req, res) {
    try {
        const foundMovie = await Movie.findOne({_id: req.params.id})
        res.status(200).json(foundMovie)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

// POST /movies/:movieId/performers/:performerId
exports.addPerformer = async function addPerformer(req, res) {
    try {
        const foundPerformer = await Performer.findOne({_id: req.params.performerId})
        if(!foundPerformer) throw new Error(`Could not locate performer ${req.params.performerId}`)
        const foundMovie = await Movie.findOne({_id: req.params.movieId})
        if(!foundMovie) throw new Error(`Could not locate movie ${req.params.movieId}`)
        // many to many relationship
        foundMovie.cast.push(foundPerformer._id)
        foundPerformer.credits.push(foundMovie._id)
        await foundMovie.save()
        await foundPerformer.save()
        res.status(200).json({
            msg: `Successfully associated performer with id ${req.params.performerId} with movie with id ${req.params.movieId}`,
            movie: foundMovie,
            performer: foundPerformer
        })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}
