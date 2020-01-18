const socketio = require('socket.io');
const { parseStringToArray, calculateDistance } = require('./utils/utils');

let io;
const connections = [];

exports.setupWebSocket = server => {
  
  io = socketio(server);

  io.on('connection', socket => {
    
    const { latitude, longitude, techs } = socket.handshake.query;

    connections.push({
      id: socket.id,
      coordinates: {
        latitude: Number(latitude),
        longitude: Number(longitude)
      },
      techs: parseStringToArray(techs)
    });
  });
}

exports.findConnections = (coordinates, techs) => {

  return connections
    .filter(connection => {
      return calculateDistance(coordinates, connection.coordinates) < 10
        && connection.techs.some(tech => techs.includes(tech));
    });
}

exports.sendMessage = (connections, message, data) => {

  connections.forEach(connection => {
    io.to(connection.id).emit(message, data);
  });
}