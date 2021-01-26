// eslint-disable-next-line import/no-unresolved
const { socketConsume } = require('rpcsocketlib');

socketConsume('http://localhost:4001', 'test-channel', async (body) => {
  console.log(body);
  return body;
});
