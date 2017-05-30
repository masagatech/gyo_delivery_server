var PORT = 33333;
var HOST = '127.0.0.1';

var messagebody = {
    "act": "",
    "msg": ""
}


var dgram = require('dgram');
var server = dgram.createSocket('udp4');

server.on('listening', function() {
    var address = server.address();
    console.log('UDP Server listening on ' + address.address + ":" + address.port);
});

server.on('message', function(message, remote) {
    console.log(remote.address + ':' + remote.port + ' - ' + message);
    messageParse(message, remote);

});


function messageParse(message, remote) {
    var msgs = JSON.parse(message);
    switch (msgs.act) {
        case "initials":
            var ms = CreatePacket(msgs.act, { "url": "http://192.168.1.4:3000/login" }, "")
            server.send(ms, 0, ms.length, remote.port, remote.address);
            break;

        default:
            break;
    }

}

function ab2str(buf) {
    var s = String.fromCharCode.apply(null, new Int8Array(buf));
    return JSON.parse(s);
}


function stringToArrayBuffer(str) {
    var buf = new Int8Array(str.length);
    for (var i = 0, strLen = str.length; i < strLen; i++) {
        buf[i] = str.charCodeAt(i);
    }
    return buf.buffer;
}

function CreatePacket(action, message, mac) {
    return JSON.stringify({ "act": action, "msg": message, "mac": mac });
}

server.bind(PORT);