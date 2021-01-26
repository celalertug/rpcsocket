const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const clientIO = require('socket.io-client');
const { v4 } = require('uuid');

const socketServer = async (port) => new Promise((resolve) => {
  const app = express();
  const httpServer = http.Server(app);
  const io = socketIO(httpServer);

  // const context = createContext();

  io.on('connection', async (socket) => {
    // console.log(socket.id, 'connected');

    socket.on('disconnect', () => {
      // todo disconnect olursa err response don
    });

    socket.on('forward', async (msg) => {
      io.emit(msg.channel, msg);
    });
  });

  const listener = httpServer.listen(port, () => {
    console.log(`listening on *:${port}`);
    resolve(listener);
  });
});

const socketConsume = (uri, channel, cb = async () => {
}) => {
  const socket = clientIO(uri);
  socket.on(channel, async (msg) => {
    const res = await cb(msg.body);

    const { replyTo, correlationId } = msg;
    if (replyTo) {
      socket.emit('forward', {
        replyTo: '',
        channel: replyTo,
        correlationId,
        body: res,
      });
    }
  });
};

const socketRequest = (uri, channel, body,
  config = {
    timeout: 0,
    noReply: false,
  }) => new Promise((resolve, reject) => {
  const { noReply, timeout } = config;
  const correlationId = v4();
  const replyTo = noReply === false ? v4() : '';

  const socket = clientIO(uri);
  socket.on('connect', () => {
    if (timeout > 0 && noReply === false) {
      setTimeout(() => {
        socket.close();
        reject(new Error('timeout'));
      }, timeout);
    }

    if (!noReply) {
      socket.on(replyTo, (received) => {
        // const r = JSON.parse(received);
        const r = received;
        if (r.correlationId === correlationId) {
          socket.close();
          resolve(r.body);
        }
      });
    }

    socket.emit('forward', {
      channel,
      replyTo,
      correlationId,
      body,
    }, () => {
      if (noReply) {
        socket.close();
        resolve();
      }
    });
  });
});

module.exports = { socketServer, socketRequest, socketConsume };
