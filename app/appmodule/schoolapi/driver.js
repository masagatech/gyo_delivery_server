var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var driver = module.exports = {};

driver.saveDriverInfo = function saveDriverInfo(req, res, done) {
    db.callFunction("select " + globals.schema("funsave_driverinfo") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

driver.getDriverDetails = function getDriverDetails(req, res, done) {
    db.callProcedure("select " + globals.schema("funget_driverdetails") + "($1,$2::json);", ['drv', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}