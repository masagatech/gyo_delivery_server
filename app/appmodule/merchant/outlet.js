var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var outlet = module.exports = {};

outlet.saveOutletInfo = function saveOutletInfo(req, res, done) {
    db.callFunction("select " + globals.merchant("funsave_outletinfo") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

outlet.getOutletDetails = function getOutletDetails(req, res, done) {
    db.callProcedure("select " + globals.merchant("funget_outletdetails") + "($1,$2::json);", ['ol', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}