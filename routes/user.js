import express from 'express'
import User from '../controller/user'
import passport from 'passport'
import passportConf from '../passport'

const router = express.Router()

passportConf(passport)

/* GET users listing. */
router.post('/api/user/login', User.login)

router.post('/api/user/register', User.register)

router.get('/api/user/test', User.test)

// token 验证
router.get('/api/user/info', passport.authenticate('bearer', { session: false }), User.info)

router.post('/api/user/accesstoken', User.accesstoken)

export default router
