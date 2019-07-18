class Users {
  constructor () {
    this.users = [];
  }
  all() {
    return this.users;
  }
  addUser (user) {
    this.users.push(user);
    return user;
  }
  removeUser (id) {
    const user = this.getUser(id);
    if (user) {
      this.users = this.users.filter((user) => user.id != id);
    }
    return user;
  }
  getUser (id) {
    return this.users.filter((user) => user.id === id)[0];
  }
}

module.exports = { Users };