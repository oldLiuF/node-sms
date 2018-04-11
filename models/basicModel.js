import { query } from '../common/basicConnection'

class BasicModel {
  /**
   * 根据条件返回一个结果
   * @param {Object} params 条件
   */
  static async findOne (params) {
    // 查询表名
    const tabelName = this.name.toUpperCase()
    const WHERE = 'WHERE '
    const AND = 'AND '

    let sql = ''
    let basicSql = `SELECT * FROM ${tabelName} `
    // 条件
    let condition = ''
    // 参数长度
    let paramsLen = Object.keys(params).length
    // 单条件
    if (paramsLen === 1) {
      let key = Object.keys(params)[0].toUpperCase()
      let value = Object.values(params)[0]
      if (typeof value !== 'string') {
        condition = `${key} = ${value}`
      } else {
        condition = `${key} = '${value}'`
      }
    } else {
      let i = 1
      for (let key in params) {
        if (params.hasOwnProperty(key)) {
          let value = params[key]

          if (typeof value !== 'string') {
            condition += `${key.toUpperCase()} = ${value}`
          } else {
            condition += `${key.toUpperCase()} = '${value}'`
          }
          // 最后一个不加 and
          condition += ` ${i !== paramsLen ? AND : ''}`
          i++
        }
      }
    }

    sql = basicSql + WHERE + condition
    console.log('sql: ' + sql)
    try {
      let result = await query(sql)
      return result[0] ? result[0] : null
    } catch (e) {
      console.log(e)
    }
  }

  async save (params) {

  }
}

export default BasicModel
