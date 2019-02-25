const expect = require('expect');
const { generateMessage } = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    const message = generateMessage('admin', 'hello, new user');

    expect(typeof message).toBe('object');
    expect(message.text).toBe('hello, new user');
    expect(message.from).toBe('admin');
    expect(typeof message.createdAt).toBe('number');
  });
});
