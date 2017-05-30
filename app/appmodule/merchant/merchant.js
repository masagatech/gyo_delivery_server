var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var merchant = module.exports = {};

merchant.saveMerchantInfo = function saveMerchantInfo(req, res, done) {
    db.callFunction("select " + globals.merchant("funsave_merchantinfo") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

merchant.getMerchantDetails = function getMerchantDetails(req, res, done) {
    db.callProcedure("select " + globals.merchant("funget_merchantdetails") + "($1,$2::json);", ['mrcht', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}