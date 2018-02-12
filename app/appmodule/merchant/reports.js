var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;
var socket = require("socket");

var dayend = module.exports = {};


dayend.getDayEndReports = function getDayEndReports(req, res, done) {
    db.callProcedure("select " + globals.merchant("funget_rpt_dayend") + "($1,$2::json);", ['de', req.body], function (data) {
        rs.resp(res, 200, data.rows);
    }, function (err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}

dayend.getInvoiceDetails = function getInvoiceDetails(req, res, done) {
    db.callProcedure("select " + globals.merchant("funget_rpt_invoice") + "($1,$2::json);", ['de', req.body], function (data) {
        rs.resp(res, 200, data.rows);
    }, function (err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}

dayend.exportInvoiceDetails = function exportInvoiceDetails(req, res, done) {
    db.callProcedure("select " + globals.merchant("funget_rpt_invoice") + "($1,$2::json);", ['eid', req.query], function (data) {
        rs.resp(res, 200, data.rows);
    }, function (err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}
dayend.getOlBankReports = function getOlBankReports(req, res, done) {
    db.callProcedure("select " + globals.merchant("funget_rpt_olbankdetailsreports") + "($1,$2::json);", ['bank', req.body], function (data) {
        rs.resp(res, 200, data.rows);
    }, function (err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}
dayend.getMerchantLedgerReports = function getMerchantLedgerReports(req, res, done) {
    db.callProcedure("select " + globals.merchant("funget_rpt_merchantledgerreports") + "($1,$2::json);", ['bank', req.body], function (data) {
        rs.resp(res, 200, data.rows);
    }, function (err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}