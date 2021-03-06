const app = require('express')();
const http = require('http').createServer(app);
const io = require("socket.io")(http);

io.on('connection', socket => {
  console.log('user: ' + socket.id + ' =====================> connected');
  io.emit('userConnected', {userId: socket.id, nickname: ""});

  socket.on('nicknameSend', (nickname) => {
    console.log('user: ' + socket.id + ' changed nickname.');
    console.log('nickname: ' + nickname.nickname);
    io.emit('userNickname', {userId: socket.id, nickname: nickname.nickname})
  });

  socket.on('messageSend', (message) => {
    console.log('user: ' + socket.id + ' send a message');
    console.log('message: ' + message.message);
    io.emit('messageData', {userId: socket.id, messageContent: message.message})
  });

  socket.on('disconnect', () => {
    console.log('user: ' + socket.id + ' =====================> disconnected');
    io.emit('userDisconnected', {userId: socket.id, nickname: ""})
  })
});

const PORT = process.env.PORT || 5000;
http.listen(PORT, () => console.log(`Listen on: ${PORT}`));