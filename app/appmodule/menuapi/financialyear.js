var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var fy = module.exports = {};

fy.getFinancialYear = function getFinancialYear(req, res, done) {
    db.callProcedure("select " + globals.menuschema("funget_financialyear") + "($1,$2::json);", ['fy', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}

fy.saveFinancialYear = function saveFinancialYear(req, res, done) {
    db.callFunction("select " + globals.menuschema("funsave_financialyear") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}