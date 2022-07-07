const sendMessage = (socket, io, msg, usersTyping, callback) => {
    console.log(socket.client.id + ': ' + msg);
    usersTyping = usersTyping.filter(item => item.id != socket.client.id);
    io.emit('chat message', socket.client.nick + ': ' + msg);
    io.emit('users typing list', usersTyping);
    
    callback(usersTyping);
}

const isTyping = (socket, io, usersTyping, callback) => {
    if(!usersTyping.find(item => item.id == socket.client.id)){
        console.log('socket.client.nick ',socket.client.nick)
        usersTyping.push({ id: socket.client.id, nick: socket.client.nick});
        console.log('usersTyping ',usersTyping)
        io.emit('users typing list', usersTyping);
    }
    
    callback(usersTyping);
}

const stopTyping = (socket, io, usersTyping, callback) => {
    console.log(socket.client.id + ' parou de digitar');
    usersTyping = usersTyping.filter(item => item.id != socket.client.id);
    console.log('usersTyping ',usersTyping)
    io.emit('users typing list', usersTyping);
    
    callback(usersTyping);
}


module.exports = { sendMessage, isTyping, stopTyping };