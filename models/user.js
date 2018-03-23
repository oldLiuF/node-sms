class User {
  constructor (username, password, createDate) {
    this.username = username
    this.password = password
    this.createDate = createDate
  }

  set username (value) {
    this.username = value
  }

  get username () {
    return this.username
  }
}

export default User
