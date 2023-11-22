const { Router } = require('express')
const movvieController = require('../controller/movie.controller')

const router = Router()

router.get('/', movvieController.getAllMovies)

router.post('/', movvieController.createMovie)

router.put('/:id', movvieController.updateMovie);

router.delete('/:id', movvieController.deleteMovie)

module.exports = router