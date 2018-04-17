var db = require("db");
const gen = require("gen");
var rs = gen.res;

var globals = gen.globals;
var download = gen.download;

var reports = module.exports = {};
var reportsapi = require("../../reports/apis/reports.js");

// Merchant Ledger Reports

reports.getMerchantLedgerReports = function getMerchantLedgerReports(req, res, done) {
    db.callProcedure("select " + globals.merchant("funget_rpt_merchantledger") + "($1,$2,$3::json);", ['mrchtldr1', 'mrchtldr2', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 2)
}

reports.exportMerchantLedgerReports = function exportMerchantLedgerReports(req, res, done) {
    db.callProcedure("select " + globals.merchant("funget_rpt_merchantledger") + "($1,$2,$3::json);", ['expmrchtldr1', 'expmrchtldr2', req.query], function(data) {
        download(req, res, {
            data: data.rows[0],
            data1: data.rows[1],
            params: req.query
        }, { 'all': 'merchant/mrchtldr.html' }, reportsapi.getReports);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 2)
}

reports.getMerchantOrderReports = function getMerchantOrderReports(req, res, done) {
    db.callProcedure("select " + globals.merchant("funget_rpt_merchantorder") + "($1,$2,$3::json);", ['mrchtord1', 'mrchtord2', req.query], function(data) {
        if (req.query["flag"] == 'report') {
            download(req, res, {
                data: data.rows[0],
                data1: data.rows[1],
                params: req.query
            }, { 'all': 'order/mrchtorder.html' }, reportsapi.getReports);
        } else {
            rs.resp(res, 200, data.rows);
        }
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 2)
}