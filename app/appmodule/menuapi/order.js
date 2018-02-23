var db = require("db");
const gen = require("gen");
var rs = gen.res;
var globals = gen.globals;
var download = gen.download;
var http = require('http');

var order = module.exports = {};

// Order

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

order.saveValidOrder = function saveValidOrder(req, res, done) {
    db.callProcedure("select " + globals.menuschema("funvalid_saveorder") + "($1,$2::json);", ['validord', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}

order.saveOrderInfo = function saveOrderInfo(req, res, done) {
    db.callFunction("select " + globals.menuschema("funsave_orderinfo") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

// Rating

order.saveOrderRating = function saveOrderRating(req, res, done) {
    db.callFunction("select " + globals.menuschema("funsave_orderrating") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

order.getOrderRating = function getOrderRating(req, res, done) {
    db.callProcedure("select " + globals.menuschema("funget_orderrating") + "($1,$2::json);", ['ordrat', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}

// Export

var invoicereportapi = require("../../reports/apis/invoice.js");

order.getOrderDetailsExport = function getOrderDetailsExport(req, res, done) {
    db.callProcedure("select " + globals.menuschema("funget_orderdetails_export") + "($1,$2,$3::json);", ['ord1', 'ord2', req.query], function(data) {
        download(req, res, {
            data: data.rows[0],
            data1: data.rows[1],
            params: req.query
        }, { 'all': 'invoice/menuinvoicerpt.html' }, invoicereportapi.invoiceDetails);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 2)
}