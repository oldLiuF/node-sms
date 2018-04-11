import { Strategy } from 'passport-http-bearer'
import UserModel from './models/user'

export default function (passport) {
  passport.use(new Strategy(async (token, done) => {
    try {
      let user = await UserModel.findOne({ token })

      if (!user) {
        return done(null, false)
      }
      return done(null, user)
    } catch (e) {
      return done(e)
    }
  }))
}
