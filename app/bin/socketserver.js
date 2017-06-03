var socketserver = module.exports = {};
socketserver.io = null;

socketserver.start = function() {
    socketserver.io.on('connection', function(client) {
     
        client.on('disconnect', function() {
            //client.emit('msg', "client disconnected!");

        });
     
        client.on('register', function(msg) {
            // client.
            client.join(msg.regname);
            client.emit("msgd", { "evt": "registered", "msg": msg.regname });

        });

         client.on('unregister', function(msg) {
            // client.
            client.leave(msg);
            client.emit("msgd", { "evt": "unregistered", "msg": msg });

        });

        client.on('room', function(msg) {
            socketserver.io.sockets.in(msg.room).emit("data", { "evt": "unregistered", "msg": msg.data });
        });

        client.emit("msgd", { "evt": "regreq" });

    });
}