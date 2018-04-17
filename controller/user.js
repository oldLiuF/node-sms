import { query } from '../common/basicConnection'
import sqlMap from '../common/sqlMap'
import moment from 'moment'
import UserModel from '../models/user'
import jwt from 'jsonwebtoken'
import secret from '../config/token'

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

  info (req, res, next) {
    console.log(req)
    res.send({
      username: req.user.username
    })
  }

  // // 检查用户名与密码, 如果验证通过, 生成一个accesstoken
  async accesstoken (req, res, next) {
    let user = await UserModel.findOne({
      username: req.body.username
    })

    if (!user) {
      res.send({
        success: false,
        message: '认证失败, 用户不存在'
      })
    } else {
      if (user.password === req.body.password) {
        let token = jwt.sign({ name: user.username }, secret, {
          expiresIn: '1d' // 过期时间
        })
        try {
          // 保存 token
          let result = await query(sqlMap.user.saveToken, [token, user.id])

          if (result.serverStatus === 2) {
            res.send({
              success: true,
              message: '验证成功!',
              token: 'Bearer ' + token,
              status: 200,
              name: user.username
            })
          }
          console.log(result)
        } catch (e) {
          res.send(e)
        }
      }
    }
  }
}

export default new User()
