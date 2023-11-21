const { Router } = require('express')
const router = Router()
const moviesRoutes = require('./movies.routes')

router.use('/api/movies', moviesRoutes)

module.exports = router