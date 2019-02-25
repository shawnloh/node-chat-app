const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage } = require('./utils/message');

const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(path.join(__dirname, '../public')));

io.on('connection', socket => {
  console.log('new user connected');

  socket.on('disconnect', () => {
    console.log('new user disconnected');
  });

  socket.emit(
    'newMessage',
    generateMessage('Admin', 'Welcome to the chat app')
  );

  socket.broadcast.emit(
    'newMessage',
    generateMessage('Admin', 'A new user has joined the chat')
  );

  socket.on('createMessage', message => {
    console.log('create a new message');
    console.log('From:', message.from);
    console.log('Text:', message.text);
    io.emit('newMessage', generateMessage(message.from, message.text));
    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });
  });
});

server.listen(PORT, () => console.log(`server is online at port ${PORT}`));
