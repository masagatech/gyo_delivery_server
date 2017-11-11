var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var mord = module.exports = {};

mord.getManualOrder = function getManualOrder(req, res, done) {
    db.callProcedure("select " + globals.merchant("funget_manualorder") + "($1,$2::json);", ['mord', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}

mord.saveManualOrder = function saveManualOrder(req, res, done) {
    db.callFunction("select " + globals.merchant("funsave_manualorder") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}