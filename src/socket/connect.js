const disconnected = (socket, io, users, usersTyping, callback) => {
    console.log('user disconnected');
    users = users.filter(i=> i.id !== socket.client.id);
    usersTyping = usersTyping.filter(item => item.id != socket.client.id);
    io.emit('chat message', socket.client.nick + ' deixou sala de chat ');
    io.emit('users', users);
    
    callback(users, usersTyping);
}


module.exports = { disconnected };