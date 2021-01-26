# rpcsocketlib

## install

```bash
yarn add rpcsocketlib
```

### server.js

```js

const { socketServer } = require('rpcsocketlib');

(async () => {
  await socketServer(4001);
})();

```

### provider.js

```js

const { socketConsume } = require('rpcsocketlib');

socketConsume('http://localhost:4001', 'test-channel', async (body) => {
  console.log(body);
  return body;
});

```

### consumer.js

```js

const { socketRequest } = require('rpcsocketlib');

(async () => {
  const res = await socketRequest('http://localhost:4001', 'test-channel', { message: 'surprise motherfucker' });
  console.log(res);
})();

```


## usage

socketRequest (uri, channel, body, config)

- uri : socket server url, ex : http://localhost:4001
- channel : target client channel
- body : data, type : object
- config : options [timeout : int , noReply : bool]


socketConsume (uri, channel, cb)

- uri : socket server url, ex : http://localhost:4001
- channel : incoming data channel
- cb : callback, ex : cb(body) {}



