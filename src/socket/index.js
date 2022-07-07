const { disconnected } = require('./connect');
const { isTyping, stopTyping, sendMessage } = require('./message');
const { setNick } = require('./nick');

const SocketConnection = (io) => {
    let usersTyping = [];
    let users= [];

    io.on('connection', (socket) => {
        console.log('a user connected');
        socket.client.nick = 'Unknown'+Math.floor(Math.random() * 100);
    
        users.push({ id: socket.client.id, nick: socket.client.nick});
        console.log(users)
        io.emit('users', users);
        io.emit('chat message', socket.client.nick + ' entrou no sala de chat ');
    
        socket.on('disconnect', () => disconnected(socket, io, users, usersTyping, (users2, usersTyping2) => {
            users = users2;
            usersTyping = usersTyping2;
        }));
    
        socket.on('user typing', () => isTyping(socket, io, usersTyping, (usersTyping2) => {
            usersTyping = usersTyping2;
        }));
    
        socket.on('user stopped typing', () => stopTyping(socket, io, usersTyping, (usersTyping2) => {
            usersTyping = usersTyping2;
        }));
    
        socket.on('chat message', (msg) => sendMessage(socket, io, msg, usersTyping, (usersTyping2) => {
            usersTyping = usersTyping2;
        }));
    
        socket.on('set nick', (msg) => setNick(socket, io, msg, users, (users2) => {
            users = users2;
        }));
    });
}

module.exports = { SocketConnection }