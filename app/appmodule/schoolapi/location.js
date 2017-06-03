var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var location = module.exports = {};

location.saveLocationInfo = function saveLocationInfo(req, res, done) {
    db.callFunction("select " + globals.schema("funsave_locationinfo") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

location.getLocationDetails = function getLocationDetails(req, res, done) {
    db.callProcedure("select " + globals.schema("funget_locationdetails") + "($1,$2::json);", ['loc', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}