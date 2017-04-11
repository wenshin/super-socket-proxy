const debug = require('debug')('socket-proxy');
const assert = require('assert');
const net = require('net');

const SocketProxy = {
  DEFAULT_START: 'proxystart',
  DELIMITER: '\r\r\n\n',

  createServer() {
    const server = net.createServer((socket) => {
      let proxySocket;

      socket.on('data', (buf) => {
        if (!proxySocket) {
          const str = buf.toString();
          const [startFlag, host, port, data] = str.split(SocketProxy.DELIMITER);
          if (startFlag === SocketProxy.DEFAULT_START && host && port) {
            debug(`[${new Date()}]receive meta`, startFlag, host, port);
            proxySocket = net.connect({port: parseInt(port, 10), host});
            proxySocket.pipe(socket);
            proxySocket.on('end', () => {
              debug('disconnected by proxy server!');
              // after pipe will auto disconnect remote server
              // proxySocket.end();
            });
            proxySocket.on('error', (err) => {
              socket.end();
              proxySocket.end();
              err.message = '[ProxyClientSocketError]' + err.message;
              server.emit('error', err);
            });

            if (data) {
              debug('write remote data first frame');
              proxySocket.write(Buffer.from(data));
            }
          }
        } else {
          debug('write remote data');
          proxySocket.write(buf);
        }
      });

      socket.on('end', () => {
        debug('disconnected by client!');
      });

      socket.on('error', (err) => {
        socket.end();
        err.message = '[ProxySocketError]' + err.message;
        server.emit('error', err);
      });
    });
    return server;
  },

  createClientServer(options) {
    const {
      host, port,
      proxyHost, proxyPort,
      targetHost, targetPort, targetName
    } = options;
    console.log(`[SocketProxy]proxy server ${proxyHost}:${proxyPort}`);
    console.log(`[SocketProxy]${targetName}：proxy ${host}:${port} to ${targetHost}:${targetPort}`);
    const server = net.createServer({
      host
    }, (socket) => {
      SocketProxy.connect({
        // cq-movie-bigdata-rowpiece-staging01
        host: targetHost,
        port: targetPort,
        proxyHost,
        proxyPort
      }, (sckt) => {
        socket.pipe(sckt).pipe(socket);
      });
    });

    server.on('error', (err) => {
      err.name = targetName;
      console.error(err);
    });

    server.listen(port);
    return server;
  },

  connect(options = {}, onConnect) {
    const host = options.host || '127.0.0.1';
    const proxyHost = options.proxyHost || '127.0.0.1';
    const proxyStart = options.proxyStart || SocketProxy.DEFAULT_START;
    const proxyDelimiter = options.proxyDelimiter || SocketProxy.DELIMITER;
    assert.ok(options.port, 'target port is necessary');
    assert.ok(parseInt(options.proxyPort, 10), 'proxy target port is necessary');
    assert.ok(typeof onConnect === 'function', 'proxy callback must be a function');

    const proxyOptions = Object.assign(
      {},
      options,
      {host: proxyHost, port: options.proxyPort}
    );
    const socket = net.connect(
      proxyOptions,
      () => {
        socket.write(`${proxyStart}${proxyDelimiter}${host}${proxyDelimiter}${options.port}${proxyDelimiter}`);
        onConnect(socket);
      }
    );
    return socket;
  }
};


module.exports = SocketProxy;
