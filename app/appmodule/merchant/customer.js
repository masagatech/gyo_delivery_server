var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var customer = module.exports = {};

customer.saveCustomerInfo = function saveCustomerInfo(req, res, done) {
    db.callFunction("select " + globals.merchant("funsave_customerinfo") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

customer.getCustomerDetails = function getCustomerDetails(req, res, done) {
    db.callProcedure("select " + globals.merchant("funget_customerdetails") + "($1,$2::json);", ['cust', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}