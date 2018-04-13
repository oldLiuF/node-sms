import express from 'express'
import User from '../controller/user'
import passport from 'passport'
import passportConf from '../passport'
/* import jwt from 'jsonwebtoken'
import secret from '../config/token' */

const router = express.Router()
// 中间件验证要放在路由前面
/* router.use((req, res, next) => {
  let token = req.headers['authorization']
  console.log(secret)
  jwt.verify(token, secret, (error, decoded) => {
    console.log(error)
  })
  next()
}) */

passportConf(passport)

/* GET users listing. */
router.post('/api/user/login', User.login)

router.post('/api/user/register', User.register)

router.get('/api/user/test', User.test)

// token 验证
router.get('/api/user/getInfo',
  passport.authenticate('bearer', { session: false }),
  User.info)

router.post('/api/user/accesstoken', User.accesstoken)

export default router
