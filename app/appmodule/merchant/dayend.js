var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var dayend = module.exports = {};

dayend.saveDayEndInfo = function saveDayEndInfo(req, res, done) {
    db.callFunction("select " + globals.merchant("funsave_dayendinfo") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

dayend.getDayEndDetails = function getDayEndDetails(req, res, done) {
    db.callProcedure("select " + globals.merchant("funget_dayenddetails") + "($1,$2::json);", ['ol', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}