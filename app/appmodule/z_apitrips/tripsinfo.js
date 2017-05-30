var mondb = require("../../db/mongodbservice.js");
var rs = require("gen").res;
var globals = require("gen").globals;
var datetime = require('node-datetime');
var socketserver = require("../../bin/socketserver.js"); //socket server for instant message

var tripsinfo = module.exports = {};


//tripinfo schema
var Schema = mondb.mongoose.Schema;
var LocationSchema = new Schema({
    tripid: Number,
    sertm: Date,
    loctm: Date,
    loc: {
        type: [Number], // [<longitude>, <latitude>]
        index: '2d' // create the geospatial index
    },
    drvid: Number,
    speed: Number,
    bearing: Number,
    appvr: String,
    uid: String,
    pdid: Number
});

mondb.mongoose.model('tripdetails', LocationSchema);

tripsinfo.createtripdetails = function(req, res, done) {
    try {
        if (req.body) {
            if (req.body) {
                req.body.loc = JSON.parse(req.body.loc);
                req.body.sertm = Date.now();
            }
        }
        var loc = req.body.loc;
        mondb.mongoose.model('tripdetails').create(req.body, function(err, data) {
            if (err) {
                //console.log(err);
                if(res)
                {
                    rs.resp(res, 400, err);
                }
                return;
            }
            //console.log(data);
            if(res)
                {
                    rs.resp(res, 200, data._id);
                }
            try {
                // console.log(req.body);
                var data = {
                    "lat": loc[0],
                    "lon": loc[1],
                    "speed": req.body.speed,
                    "bearng": req.body.bearing,
                    "tripid": req.body.tripid,
                    "sertm": req.body.sertm
                }

                socketserver.io.sockets.in(req.body.tripid).emit('msgd', { "evt": "data", "data": data });
            } catch (e) {

            }
        });
    } catch (ex) {
         if(res){
            rs.resp(res, 400, ex.message);
         }
        //console.error(ex.message);
    }
}

tripsinfo.stop =function(data){
    socketserver.io.sockets.in(data.tripid).emit('msgd', { "evt": "stop", "data": data });
}



tripsinfo.gettripdelta = function(req, res, done) {
    var limit = req.body.limit || 1;
    var d = mondb.mongoose.model('tripdetails').find({ 'tripid': req.body.tripid }).select('tripid loc bearing sertm speed').sort({ 'sertm': -1 }).limit(limit);
    d.exec(function(err, data) {
        if (err) {
            rs.resp(res, 400, err);
            return;
        }
        rs.resp(res, 200, data);
    });

}