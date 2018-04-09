import { query } from '../common/basicConnection'

class BasicModel {
  static async findOne (params) {
    // 查询表名
    const tabelName = this.name.toUpperCase()
    const WHERE = 'WHERE '
    const AND = 'AND '

    let sql = ''
    let basicSql = `SELECT * FROM ${tabelName} `
    // 条件
    let condition = ''
    let paramsLen = Object.keys(params).length
    // 单条件
    if (paramsLen === 1) {
      condition = `${Object.keys(params)[0].toUpperCase()} = ${Object.values(params)[0]}`
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

    let result = await query(sql)

    return result[0] ? result[0] : null
  }
}

export default BasicModel
