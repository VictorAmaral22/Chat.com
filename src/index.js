const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);

// SOCKET
const {
    Server
} = require("socket.io");

const { SocketConnection } = require('./socket');

const io = new Server(server);

SocketConnection(io);

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});


server.listen(3000, () => {
    console.log('listening on http://localhost:3000');
});