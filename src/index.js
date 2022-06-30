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
var usersTyping = [];

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.client.nick = 'Unknown'+Math.floor(Math.random() * 100);
    io.emit('chat message', socket.client.nick + ' entrou no sala de chat ');


    socket.on('disconnect', () => {
        console.log('user disconnected');
        usersTyping = usersTyping.filter(item => item.id != socket.client.id);
        io.emit('chat message', socket.client.nick + ' deixou sala de chat ');
    });

    socket.on('user typing', () => {
        if(!usersTyping.find(item => item.id == socket.client.id)){
            console.log('socket.client.nick ',socket.client.nick)
            usersTyping.push({ id: socket.client.id, nick: socket.client.nick});
            console.log('usersTyping ',usersTyping)
            // let typersExceptU = usersTyping.filter(item => item.id != socket.client.id)
            io.emit('users typing list', usersTyping);
        }
    });

    socket.on('user stopped typing', () => {
        console.log(socket.client.id + ' parou de digitar');
        usersTyping = usersTyping.filter(item => item.id != socket.client.id);
        console.log('usersTyping ',usersTyping)
        // let typersExceptU = usersTyping.filter(item => item.id != socket.client.id)
        io.emit('users typing list', usersTyping);
    });

    socket.on('chat message', (msg) => {
        console.log(socket.client.id + ': ' + msg);
        usersTyping = usersTyping.filter(item => item.id != socket.client.id);
        io.emit('chat message', socket.client.nick + ': ' + msg);
        io.emit('users typing list', usersTyping);
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