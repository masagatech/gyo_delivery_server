var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var order = module.exports = {};

order.postOrderDash = function getOrderDash(req, res, done) {
    db.callProcedure("select " + globals.merchant("funget_orderdashboard") + "($1,$2,$3::json);", ['dash1', 'dash2', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 2)
}

order.getOrderDash = function getOrderDash(req, res, done) {
    req.body = req.query;
    order.postOrderDash(req, res, done);
}

order.getOrderDetails = function getOrderDetails(req, res, done) {
    if (req.query.flag == undefined) {

        rs.resp(res, 401, "invalid input parameters flag");
        return;
    }

    db.callProcedure("select " + globals.merchant("funget_orderdashdetails") + "($1,$2::json);", ['dashdetail', req.query], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}