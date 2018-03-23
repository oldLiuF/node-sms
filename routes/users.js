import express from 'express'
import user from '../controller/user'

const router = express.Router()

/* GET users listing. */
router.get('/api/test', user.login)

export default router
