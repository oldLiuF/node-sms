import { query } from '../common/basicConnection'
import sqlMap from '../common/sqlMap'
import moment from 'moment'
import UserModel from '../models/user'

class User {
  /**
   * 用户登录
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  async login (req, res, next) {
    try {
      let result = await query(sqlMap.user.login,
        [req.body.username, req.body.password]
      )
      if (result.length === 0) {
        res.send({})
      } else {
        req.session.user_id = result[0].id
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

  async register ({ body }, res, next) {
    try {
      let users = await query(sqlMap.user.findUserByName, body.username)

      if (users.length === 1) {
        res.send({
          message: '账号已存在'
        })
      } else {
        let result = await query(sqlMap.user.register,
          [body.username, body.password, moment().format('YYYY-MM-DD HH:mm:ss'), null]
        )
        res.send({
          id: result.insertId
        })
      }
    } catch (e) {
      console.log(e)
    }
  }

  async test (req, res, next) {
    let result = await UserModel.findOne({
      username: 'test1',
      password: '1'
    })
    res.send(result)
  }
}

export default new User()
