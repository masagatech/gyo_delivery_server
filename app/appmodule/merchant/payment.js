var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var payment = module.exports = {};

// Payment

payment.savePaymentDetails = function savePaymentDetails(req, res, done) {
    db.callFunction("select " + globals.merchant("funsave_paymentdetails") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

payment.getPaymentDetails = function getPaymentDetails(req, res, done) {
    db.callProcedure("select " + globals.merchant("funget_paymentdetails") + "($1,$2::json);", ['pay', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}

// Card

payment.saveUserCards = function saveUserCards(req, res, done) {
    db.callFunction("select " + globals.merchant("funsave_usercards") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

payment.getUserCards = function getUserCards(req, res, done) {
    db.callProcedure("select " + globals.merchant("funget_usercards") + "($1,$2::json);", ['pay', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}