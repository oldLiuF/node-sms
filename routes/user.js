import express from 'express'
import user from '../controller/user'

const router = express.Router()

/* GET users listing. */
router.post('/api/user/login', user.login)

export default router
