# super-socket-proxy

a socket proxy server and client for node.

## feature

# Install

    npm i --save super-socket-proxy
    npm i -g super-socket-proxy

# CLI Usage

```
Usage: scktp [options] [host:port]

Options:

    -h, --help                output usage information
    -V, --version             output the version number
    -s, --server              run as a proxy server
    -o, --host   [host]       local server host, default is localhost
    -r, --port   [port]       local server port
    -t, --target [host:port]  the target service address like 10.1.1.10:8000
    -p, --proxy  [host:port]  give one proxy service like 10.1.1.1:8887
    -c, --config [json]       a json file for client server
```

# NODE Usage

## SocketProxy.createServer(options)
create a server side proxy server.

* `options`: [Object], An object which is optional.
* `options.host`: [String], Host the server will run with, default is localhost.
* `options.port`: [Number], Port the server run.
* `@return`: [Socket]

```javascript
// proxy server
const SocketProxy = require('super-socket-proxy');

SocketProxy
    .createServer()
    .listen(8888);

const targetHost = '10.1.1.10';
const targetPort = 8888;
const proxyHost = '10.1.1.1';
const proxyPort = 8887;
// proxy client server
// create a local server 'localhost:8888' proxy to
// target server '10.1.1.10:8888'
// through the proxy server '10.1.1.1:8887'
SocketProxy
    .createClientServer({
        targetHost,
        targetPort,
        proxyHost,
        proxyPort
    })
    .listen(8888);

// connect to proxy server directly
SocketProxy.connect({
    host: targetHost,
    port: targetPort,
    proxyHost,
    proxyPort
  }, (sckt) => {
    // pipe data to downstream
  });
```

# Release Note

v0.1.0 2017-04-11

    * first version
