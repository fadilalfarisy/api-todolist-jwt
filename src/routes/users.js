import express from "express"
import auth from "../middleware/authorization.js"
import userController from '../controller/users.js'

const user = express.Router()

user.post('/register', userController.register)
user.post('/login', userController.login)
user.get('/logout', userController.logout)
user.get('/refresh', userController.checkRefreshToken)

user.get('/user', userController.getUser)
user.delete('/user/:id', userController.deleteUser)

export default user