const { Router } = require('express')
const moviesRoutes = require('./movies.routes')
const usersRoutes = require('./user.routes')
const router = Router()

router.use('/api/movies', moviesRoutes)
router.use('/api/users', usersRoutes)

module.exports = router