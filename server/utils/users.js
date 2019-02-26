// [
//   {
//     id: '',
//     name: 'Shawn',
//     room: 'The office fans'
//   }
// ];

// addUser(id, name, room)
// removeUser(id)
// getUser(id)
// getUserList(room)

class Users {
  constructor() {
    this.users = [];
  }
  addUser(id, name, room) {
    const user = {
      id,
      name,
      room
    };
    this.users.push(user);
    return user;
  }

  removeUser(id) {
    // return user that was removed;
    let user = this.getUser(id);
    if (user) {
      this.users = this.users.filter(user => user.id !== id);
    }

    return user;
  }

  getUser(id) {
    // return user
    return this.users.filter(user => {
      return user.id === id;
    })[0];
  }

  getUserList(room) {
    // return array of users
    const users = this.users.filter(user => {
      return user.room.toLowerCase() === room.toLowerCase();
    });
    const namesArray = users.map(user => user.name);
    return namesArray;
  }
}

module.exports = { Users };
