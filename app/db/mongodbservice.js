var mongoose = require('mongoose');

var globals = require("gen").globals;

var mondb = module.exports = {};

mongoose.Promise = Promise;

mondb.mongoose = mongoose;

mondb.constr = globals.monconstr();

mondb.connected = false;

mondb.start = function connect() {
    try {
        mongoose.connect(mondb.constr, function(error, success) {
            console.log("connected to mongo!!!");
        });

    } catch (e) {
        console.log("Unable to start mongo" + " Error: > " + e.message);
    }
}