var socket = io();

socket.on('connect', function() {
  console.log('connected to server');
  setTimeout(() => {
    socket.emit('createMessage', {
      from: 'shawn@example.com',
      text: 'Sup, im good!'
    });
  }, 3000);
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

socket.on('newMessage', function(data) {
  console.log('New message received!');
  console.log('From:', data.from);
  console.log('Text:', data.text);
  console.log('Created at:', data.createdAt);
});
