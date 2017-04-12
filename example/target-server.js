const net = require('net');

net.createServer((socket) => {
  socket.on('data', () => {
    socket.write('hello world! we received data!');
    socket.end();
  });
}).listen(8881, (err) => {
  if (!err) {
    console.log('run target server on 8881');
  } else {
    console.error(err);
  }
});
