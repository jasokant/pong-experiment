var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('gamma', function (data) {
    console.log(data);
    socket.broadcast.emit('gamma', data);
  });

});

http.listen(4000, function(){
  console.log('listening on *:4000');
});
