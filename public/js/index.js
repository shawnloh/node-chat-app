var socket = io();

socket.on('connect', function() {
  console.log('connected to server');
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

socket.on('newMessage', function(data) {
  var formattedTime = moment(data.createdAt).format('h:mm a');
  var template = $('#message-template').html();
  var html = Mustache.render(template, {
    text: data.text,
    from: data.from,
    createdAt: formattedTime
  });
  $('#messages').append(html);

  // console.log('New message received!', data);

  // var li = $('<li></li>');
  // li.text(`${data.from} ${formattedTime}: ${data.text}`);
  // $('#messages').append(li);
});

socket.on('newLocationMessage', function(data) {
  var formattedTime = moment(data.createdAt).format('h:mm a');
  var template = $('#location-message-template').html();
  var html = Mustache.render(template, {
    url: data.url,
    from: data.from,
    createdAt: formattedTime
  });
  // var li = $('<li></li>');
  // var a = $('<a target="_blank">My current location</a>');
  // li.text(`${data.from} ${formattedTime}: `);
  // a.attr('href', data.url);
  // li.append(a);
  $('#messages').append(html);
});

$('#message-form').on('submit', function(e) {
  e.preventDefault();

  var messageTextbox = $('[name=message]');
  socket.emit(
    'createMessage',
    {
      from: 'User',
      text: messageTextbox.val()
    },
    function() {
      messageTextbox.val('');
    }
  );
});

var locationButton = $('#send-location');
locationButton.on('click', function(e) {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser');
  }
  locationButton.attr('disabled', 'disabled').text('Sending location...');
  navigator.geolocation.getCurrentPosition(
    function(position) {
      socket.emit('createLocation', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
      locationButton.removeAttr('disabled').text('Send location');
    },
    function() {
      alert('Unable to fetch location.');
      locationButton.removeAttr('disabled').text('Send location');
    }
  );
});
