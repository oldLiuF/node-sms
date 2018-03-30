import express from 'express'
import User from '../controller/user'

const router = express.Router()

/* GET users listing. */
router.post('/api/user/login', User.login)

router.post('/api/user/register', User.register)

export default router
