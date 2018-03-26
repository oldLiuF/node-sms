import { query, queryTest } from '../common/basicConnection'
import sqlMap from '../common/sqlMap'

class User {
  /**
   * 用户登录
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  async login (req, res, next) {
    try {
      // let result = await query(sqlMap.user.login)
      let result = await queryTest(sqlMap.user.getUserList)
      console.log(result)
      res.send(result)
    } catch (e) {
      console.log(e)
      throw new Error(e)
    }
  }
}

export default new User()
