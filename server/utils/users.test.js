const expect = require('expect');

const { Users } = require('./users');

describe('Users', () => {
  let users;
  beforeEach(() => {
    users = new Users();
    users.users = [
      {
        id: 1,
        name: 'Mike',
        room: 'Node Course'
      },
      {
        id: 2,
        name: 'Shawn',
        room: 'React Course'
      },
      {
        id: 3,
        name: 'Jen',
        room: 'Node Course'
      }
    ];
  });

  it('should add new user', () => {
    const users = new Users();
    const user = {
      id: 123,
      name: 'Shawn',
      room: 'NodeTest'
    };

    const resUser = users.addUser(user.id, user.name, user.room);

    expect(resUser).toMatchObject(user);

    expect(users.users).toEqual([user]);
  });

  it('should remove a user', () => {
    const user = users.removeUser(1);
    expect(user.id).toBe(1);
    expect(users.users.length).toBe(2);
  });

  it('should not remove user', () => {
    const user = users.removeUser(99);
    expect(user).toBeFalsy();
    expect(users.users.length).toBe(3);
  });

  it('should find user', () => {
    const userId = 2;
    const user = users.getUser(userId);

    expect(user.id).toBe(userId);
  });

  it('should not find user', () => {
    const userId = 4;
    const user = users.getUser(userId);

    expect(user).toBeFalsy();
  });

  it('should return names for node course', () => {
    const userList = users.getUserList('react Course');

    expect(userList).toEqual(['Shawn']);
  });
});
