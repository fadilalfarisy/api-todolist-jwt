import express from "express"
import user from './users.js'
import todo from './todos.js'

const router = express.Router()

router.use('/', user)
router.use('/', todo)

export default router