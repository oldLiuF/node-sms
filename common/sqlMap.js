const sqlMap = {
  user: {
    getUserList: 'selec * from user',
    login: 'select * from user where username = ? and password = ?'
  }
}

export default sqlMap
