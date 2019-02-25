var socket = io();

socket.on('connect', function() {
  console.log('connected to server');
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

socket.on('newMessage', function(data) {
  console.log('New message received!', data);
  const li = jQuery('<li></li>');
  li.text(`${data.from}: ${data.text}`);
  jQuery('#messages').append(li);
});

socket.emit(
  'createMessage',
  {
    from: 'Frank',
    text: 'Hi'
  },
  function(data) {
    console.log('Got it!', data);
  }
);

jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();

  socket.emit(
    'createMessage',
    {
      from: 'User',
      text: jQuery('[name=message]').val()
    },
    function() {}
  );
});
