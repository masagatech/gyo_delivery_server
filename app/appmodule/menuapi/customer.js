var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var cust = module.exports = {};

// Customer

cust.saveCustomerLogin = function saveCustomerLogin(req, res, done) {
    db.callProcedure("select " + globals.menuschema("funsave_customerlogin") + "($1,$2::json);", ['cust', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}

cust.getCustomerProfile = function getCustomerProfile(req, res, done) {
    db.callProcedure("select " + globals.menuschema("funget_customerprofile") + "($1,$2::json);", ['custprof', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}