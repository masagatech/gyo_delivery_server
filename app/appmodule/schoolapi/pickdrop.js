var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var pidr = module.exports = {};

pidr.savePickDropInfo = function savePickDropInfo(req, res, done) {
    db.callFunction("select " + globals.schema("funsave_pickdropinfo") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

pidr.getPickDropDetails = function getPickDropDetails(req, res, done) {
    db.callProcedure("select " + globals.schema("funget_pickdropdetails") + "($1,$2::json);", ['pd', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}