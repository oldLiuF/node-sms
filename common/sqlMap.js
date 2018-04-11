const sqlMap = {
  user: {
    getUserList: 'selec * from user',
    login: 'select * from user where username = ? and password = ?',
    register: 'insert into user (username, password, createDate, lastLoginTime) values (?, ?, ?, ?)',
    findUserByName: 'select * from user where username = ?',
    saveToken: 'update user set token = ? where id = ?'
  }
}

export default sqlMap
