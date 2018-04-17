var db = require("db");
const gen = require("gen");
var rs = gen.res;

var globals = gen.globals;
var download = gen.download;

var reports = module.exports = {};
var reportsapi = require("../../reports/apis/reports.js");

// Bank Reports

reports.getBankReports = function getBankReports(req, res, done) {
    db.callProcedure("select " + globals.merchant("funget_rpt_bankdetails") + "($1,$2,$3::json);", ['bank1', 'bank2', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 2)
}

reports.exportBankReports = function exportBankReports(req, res, done) {
    db.callProcedure("select " + globals.merchant("funget_rpt_bankdetails") + "($1,$2,$3::json);", ['expbank1', 'expbank2', req.query], function(data) {
        download(req, res, {
            data: data.rows[0],
            data1: data.rows[1],
            params: req.query
        }, { 'all': 'bankpayment/bankpayment.html' }, reportsapi.getReports);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 2)
}