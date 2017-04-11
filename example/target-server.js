const net = require('net');

net.createServer((socket) => {
  socket.on('data', () => {
    socket.write('hello world!');
    socket.write('we received data!');
    socket.end();
  });
}).listen(8881);
