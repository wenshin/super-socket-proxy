Run this example follows below steps:

1. run `example/node target-server.js` start a target server which you actually what access.
2. run `bin/scktp -s` start a proxy server.
3. run `bin/scktp -c client-server-config.json` start a proxy client server.
4. run `node request-client.js` start a request to the target server.
