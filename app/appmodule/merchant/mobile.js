var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var livebeat = module.exports = {};

livebeat.savelivebeat = function savelivebeat(req, res, done) {
    // if(req.query.tripid!='0') {
    //     MongoClient.connect(url, function(err, db) {
    //     if (err) throw err;
    //     var trip_details = req.query;
    //         db.collection("tripdetails").insertOne( trip_details, function(err, res) {
    //             if (err) throw err;
    //             console.log("1 record inserted");
    //             db.close();
    //         });
    //     });
    // }

    db.callFunction("select " + globals.merchant("api_funsave_riderlive") + "($1::json);", [req.query], function(data) {
        rs.resp(res, 200, data.rows[0].api_funsave_riderlive);
        console.log(data.rows[0].api_funsave_riderlive);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
        console.log(err);
    })
}