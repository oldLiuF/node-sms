import mysql from 'mysql'
import dbConf from '../config/db'

// 创建连接池
const pool = mysql.createPool(dbConf)

/**
 * 不加参数的语句
 * @param {string} sql
 * @return {promise}
 */
export function query (sql) {
  return new Promise((resolve, reject) => {
    // 获取链接
    pool.getConnection((err, conn) => {
      if (err) reject(err)

      conn.query(sql, (err, rows) => {
        if (err) {
          reject(err)
        } else {
          resolve(rows)
        }
        // 释放链接
        conn.release()
      })
    })
  })
}

export async function queryTest (sql) {
  try {
    let result = await base(sql)
    return result
  } catch (e) {
    console.log(e)
    throw new Error(e)
  }

  async function base (sql) {
    return new Promise((resolve, reject) => {
      // 获取链接
      pool.getConnection((err, conn) => {
        if (err) resolve({err})

        conn.query(sql, (err, rows) => {
          if (err) {
            throw new Error(err)
          } else {
            resolve(rows)
          }
          // 释放链接
          conn.release()
        })
      })
    })
  }
}

export function mysqlTransaction (transaction) {
  return pool.getConnection((connection) => {
    return connection.beginTransaction().then(() => {
      return transaction(connection).then((result) => {
        return connection.commit().then(() => {
          return result
        })
      }).catch((err) => {
        return connection.rollback().then(() => {
          throw err
        })
      })
    })
  })
}
