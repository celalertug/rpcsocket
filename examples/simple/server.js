// eslint-disable-next-line import/no-unresolved
const { socketServer } = require('rpcsocketlib');

(async () => {
  await socketServer(4001);
})();
