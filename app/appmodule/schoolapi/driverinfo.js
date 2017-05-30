var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var driverinfo = module.exports = {};

driverinfo.saveDriverInfo = function saveDriverInfo(req, res, done) {
    db.callFunction("select " + globals.schema2("funsave_driverinfo") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

driverinfo.getDriverInfoGrid = function getDriverInfoGrid(req, res, done) {
    db.callProcedure("select " + globals.schema2("funget_driverinfogrid") + "($1,$2,$3::json);", ['drv1', 'drv2', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 2)
}

driverinfo.getDriverInfoDetails = function getDriverInfoDetails(req, res, done) {
    db.callProcedure("select " + globals.schema2("funget_driverinfodetails") + "($1,$2::json);", ['drv', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}