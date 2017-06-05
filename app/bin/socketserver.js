var socketserver = module.exports = {};
socketserver.io = null;

socketserver.start = function() {
    socketserver.io.on('connection', function(client) {
     
        client.on('disconnect', function() {
            //client.emit('msg', "client disconnected!");

        });
     
        client.on('regord', function(msg) {
            // client.
            var olids = JSON.parse(msg);
            var olidss = olids.ids;
            for (var index = 0; index < olidss.length - 1; index++) {
              client.join(olidss[index].toString());
            }
            //console.log(olids.ids);    
            //client.join(msg.regname);
            client.emit("ordmsg", { "evt": "registered", "msg": msg.regname });
        });

         client.on('unregord', function(msg) {
            // client.
            client.leave(msg);
            client.emit("ordmsg", { "evt": "unregistered", "msg": msg });

        });

        client.on('room', function(msg) {
            socketserver.io.sockets.in(msg.room).emit("data", { "evt": "unregistered", "msg": msg.data });
        });
        console.log("olids");    
        client.emit("ordmsg", { "evt": "regreq" });

    });
    console.log("socket server started");
}