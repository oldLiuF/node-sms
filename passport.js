import { Strategy } from 'passport-http-bearer'
import UserModel from './models/user'
import jwt from 'jsonwebtoken'
import secret from './config/token'

export default function (passport) {
  passport.use(new Strategy((token, done) => {
    jwt.verify(token, secret, async (err, decoded) => {
      // 验证 token 是否合法
      if (err) return done(err)
      try {
        // 能否找到用户
        let user = await UserModel.findOne({ token })

        if (!user) {
          return done(null, false)
        }
        return done(null, user)
      } catch (e) {
        console.log(e)
        return done(e)
      }
    })
  }))
}
