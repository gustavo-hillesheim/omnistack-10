import socketio from 'socket.io-client';

const socket = socketio('http://192.168.10.3:3333', {
  autoConnect: false
});

function connect(params) {

  socket.io.opts.query = params;
  socket.connect();
  socket.on('message', console.log);
}

function disconnect() {
  if (socket.connected) {
    socket.disconnect();
  }
}

function subscribeToNewDevs(subscribeFunction) {

  socket.on('new-dev', subscribeFunction);
}

export {
  connect,
  disconnect,
  subscribeToNewDevs
};