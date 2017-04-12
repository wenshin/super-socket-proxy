const net = require('net');

const client = net.connect({
  host: "127.0.0.1",
  port: 8882
}, () => {
  client.write('hello!');
  client.end();
});

client.on('data', (data) => {
  console.log('received: \n', data.toString());
});
