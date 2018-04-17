var db = require("db");
const gen = require("gen");
var rs = gen.res;

var globals = gen.globals;
var download = gen.download;

var reports = module.exports = {};
var reportsapi = require("../../reports/apis/reports.js");

// Day End

reports.getDayEndReports = function getDayEndReports(req, res, done) {
    db.callProcedure("select " + globals.merchant("funget_rpt_dayend") + "($1,$2,$3::json);", ['de1', 'de2', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 2)
}

reports.exportDayEndReports = function exportDayEndReports(req, res, done) {
    db.callProcedure("select " + globals.merchant("funget_rpt_dayend") + "($1,$2,$3::json);", ['expde1', 'expde2', req.query], function(data) {
        download(req, res, {
            data: data.rows[0],
            data1: data.rows[1],
            params: req.query
        }, { 'all': 'dayend/dayend.html' }, reportsapi.getReports);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 2)
}