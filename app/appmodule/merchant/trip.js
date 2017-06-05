var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var trip = module.exports = {};

trip.setTripAction = function setTripAction(req, res, done) {
    db.callFunction("select " + globals.merchant("api_funsave_trip_actions") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows[0].api_funsave_trip_actions);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}