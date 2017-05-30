var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var rider = module.exports = {};

rider.saveRiderInfo = function saveRiderInfo(req, res, done) {
    db.callFunction("select " + globals.merchant("funsave_riderinfo") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

rider.getRiderDetails = function getRiderDetails(req, res, done) {
    db.callProcedure("select " + globals.merchant("funget_riderdetails") + "($1,$2::json);", ['rdr', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}