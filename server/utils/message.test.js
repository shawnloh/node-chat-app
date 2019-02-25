const expect = require('expect');
const { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    const message = generateMessage('admin', 'hello, new user');

    expect(typeof message).toBe('object');
    expect(message.text).toBe('hello, new user');
    expect(message.from).toBe('admin');
    expect(typeof message.createdAt).toBe('number');
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    const latitude = 123;
    const longitude = 321;
    const message = generateLocationMessage('admin', latitude, longitude);

    expect(message).toMatchObject({
      from: 'admin',
      url: `https://www.google.com/maps?q=${latitude},${longitude}`
    });

    expect(typeof message.createdAt).toBe('number');
  });
});
