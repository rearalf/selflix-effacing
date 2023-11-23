const { Router } = require('express')
const userController = require('../controller/user.controller')

const router = Router()

router.get('/', userController.getAllUsers)
router.get('/:id', userController.getUser)
router.post('/', userController.createUser)
router.patch('/:id', userController.updateUser)
router.delete('/:id', userController.deletedUser)


module.exports = router