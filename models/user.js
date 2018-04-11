import BasicModel from './basicModel'

class User extends BasicModel {
  constructor (username, password, createDate) {
    super()
    this.username = username
    this.password = password
    this.createDate = createDate
  }

  /* set username (value) {
    this.username = value
  }

  get username () {
    return this.username
  } */
}

export default User
