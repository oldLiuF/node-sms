import { query } from '../common/basicConnection'
import sqlMap from '../common/sqlMap'

class User {
  /**
   * 用户登录
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  async login ({ body }, res, next) {
    try {
      let result = await query(sqlMap.user.login,
        [body.username, body.password]
      )
      if (result.length === 0) {
        res.send({})
      } else {
        res.send(result[0])
      }
      console.log(result)
    } catch (e) {
      console.log(e)
      res.send({
        errno: e.error,
        message: e.message
      })
    }
  }
}

export default new User()
