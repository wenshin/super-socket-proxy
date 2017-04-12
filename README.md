# super-socket-proxy

a socket proxy server and client for node.

## Install
First [Install NodeJS](https://nodejs.org/en/download/).
then run `npm i --save super-socket-proxy` install locally,
run `npm i -g super-socket-proxy` install globally.

## CLI Usage
below example must install NodeJS globally.

```
> scktp -h

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
> scktp -s
[SocketProxy]run proxy server at port 8887
> scktp -s --port 8888
[SocketProxy]run proxy server at port 8888
> scktp --port 8999 --target 127.0.0.1:8000 --proxy 127.0.0.1:8887
[SocketProxy]proxy server 127.0.0.1:8887
[SocketProxy]forward localhost:8999 to target server 127.0.0.1:8000
> scktp -c client.json
[SocketProxy]proxy server 127.0.0.1:8887
[SocketProxy]forward localhost:8999 to target server 127.0.0.1:8000
```

### client config

when run a proxy client server, you can use a json file to define complex proxy services. example see [example/client-server-config.json](https://github.com/wenshin/super-socket-proxy/blob/master/example/client-server-config.json)

## NODE Usage

### SocketProxy.createServer(options)
create a server side proxy server.

* `options`: [Object], An object which is optional.
* `options.host`: [String], Host the server will run with, default is localhost.
* `options.port`: [Number], Port the server run.
* `@return`: [Socket]

### SocketProxy.createClientServer(options)
create a client side server to connect to proxy server.

* `options`: [Object]
* `options.host`: [String], Host the server will run with, default is localhost.
* `options.port`: [Number], Port the server run.
* `options.targetHost`: [String], Host of the server you want access.
* `options.targetPort`: [Number], Port of the server you want access.
* `options.proxyHost`: [String], Host of the proxy server.
* `options.proxyPort`: [Number], Port of the proxy server.
* `@return`: [Socket]

### SocketProxy.connect(options)
create a server side proxy server.

* `options`: [Object], An object which is optional.
* `options.host`: [String], Host of the server you want access.
* `options.port`: [Number], Port of the server you want access.
* `options.proxyHost`: [String], Host of the proxy server.
* `options.proxyPort`: [Number], Port of the proxy server.
* `@return`: [Socket]

### examples
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
