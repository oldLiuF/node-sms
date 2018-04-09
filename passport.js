import { Strategy } from 'passport-http-bearer'

export default function (passport) {
  passport.use(new Strategy(async (token, done) => {

  }))
}
