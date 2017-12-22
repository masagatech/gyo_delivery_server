var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var order = module.exports = {};

order.getOrderDetails = function getOrderDetails(req, res, done) {
    db.callProcedure("select " + globals.menuschema("funget_orderdetails") + "($1,$2::json);", ['ord', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}

order.saveOrderDelivery = function saveOrderDelivery(req, res, done) {
    db.callFunction("select " + globals.menuschema("funsave_orderdelivery") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

order.saveOrderInfo = function saveOrderInfo(req, res, done) {
    db.callFunction("select " + globals.menuschema("funsave_orderinfo") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}