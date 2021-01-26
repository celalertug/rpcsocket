// eslint-disable-next-line import/no-unresolved
const { socketRequest } = require('rpcsocketlib');

(async () => {
  const res = await socketRequest('http://localhost:4001', 'test-channel', { message: 'surprise motherfucker' });
  console.log(res);
})();
