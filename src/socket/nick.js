const setNick = (socket, io, nick, users, callback) => {
    const oldNick = socket.client.nick;
    socket.client.nick = nick;
    for(let i = 0; i < users.length;i++){
        if(users[i].id == socket.client.id){
            users[i].nick = nick;
        }
    }
    io.emit('chat message', `${oldNick} trocou seu nome para ${nick}`);
    io.emit('users', users);

    callback(users);
}

module.exports = { setNick };