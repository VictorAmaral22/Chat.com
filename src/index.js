const express = require('express');
const app = express();

// ATENÇÃO
const http = require('http');
const server = http.createServer(app);

// SOCKET
const {
    Server
} = require("socket.io");
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.client.nick = 'Unknown'+Math.floor(Math.random() * 100);
    io.emit('chat message', socket.client.nick + ' entrou no sala de chat ');

    socket.on('disconnect', () => {
        console.log('user disconnected');
        io.emit('chat message', socket.client.nick + ' deixou sala de chat ');
    });

    socket.on('chat message', (msg) => {
        console.log(socket.client.id + ': ' + msg);
        io.emit('chat message', socket.client.nick + ': ' + msg);
    });

    socket.on('set nick', (msg) => {
        const oldNick = socket.client.nick;
        io.emit('chat message', `${oldNick} trocou seu nome para ${msg}`);
        socket.client.nick = msg;
    });
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});


server.listen(3000, () => {
    console.log('listening on http://localhost:3000');
});