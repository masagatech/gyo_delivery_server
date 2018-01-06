var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var ctwisedelvprice = module.exports = {};

ctwisedelvprice.saveCityWiseDeliveryPrice = function saveCityWiseDeliveryPrice(req, res, done) {
    db.callFunction("select " + globals.merchant("funsave_ctwisedelvprice") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

ctwisedelvprice.getCityWiseDeliveryPrice = function getCityWiseDeliveryPrice(req, res, done) {
    db.callProcedure("select " + globals.merchant("funget_ctwisedelvprice") + "($1,$2::json);", ['cwdp', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}