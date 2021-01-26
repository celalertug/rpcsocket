/* eslint-disable no-undef,no-console */
const assert = require('assert');
const { socketRequest, socketServer, socketConsume } = require('./lib');

describe('socket-lib test', async () => {
  const PORT = 4001;
  let listener;

  before(async () => {
    listener = await socketServer(PORT);
  });

  after(async () => {
    listener.close();
  });

  it('should standalone', async () => {
    socketConsume(`http://localhost:${PORT}`, 'hello-motherfucker', (body) => {
      // console.log(body);
      assert.deepStrictEqual(body, { value: 10 });
      return { value: body.value * 2 };
    });

    const res = await socketRequest(`http://localhost:${PORT}`, 'hello-motherfucker', { value: 10 });
    // console.log(res);
    assert.deepStrictEqual(res, { value: 20 });
  });

  it('should no reply', (done) => {
    socketConsume(`http://localhost:${PORT}`, 'hello-motherfucker', (body) => {
      // console.log(body);
      assert.deepStrictEqual(body, { value: 10 });
      done();
    });

    socketRequest(`http://localhost:${PORT}`, 'hello-motherfucker', { value: 10 }, { noReply: true });
  });
});
