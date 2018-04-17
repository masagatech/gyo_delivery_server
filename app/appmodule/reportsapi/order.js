var db = require("db");
const gen = require("gen");
var rs = gen.res;

var globals = gen.globals;
var download = gen.download;

var order = module.exports = {};
var reportsapi = require("../../reports/apis/reports.js");

// Manual Order

order.getManualOrderReport = function getManualOrderReport(req, res, done) {
    db.callProcedure("select " + globals.merchant("funget_rpt_manualorder") + "($1,$2,$3::json);", ['mnlord1', 'mnlord2', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 2)
}

// Invoice

order.getInvoiceDetails = function getInvoiceDetails(req, res, done) {
    db.callProcedure("select " + globals.merchant("funget_rpt_invoice") + "($1,$2::json);", ['inv', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}

order.exportInvoiceReports = function exportInvoiceReports(req, res, done) {
    db.callProcedure("select " + globals.merchant("funget_rpt_invoice_export") + "($1,$2,$3,$4::json);", ['inv1', 'inv2', 'inv3', req.query], function(data) {
        if (req.query["type"] == 'weekly') {
            download(req, res, {
                data: data.rows[0],
                data1: data.rows[1][0],
                data2: data.rows[2][0],
                params: req.query
            }, { 'all': 'invoice/weeklyinvoicerpt.html' }, reportsapi.getReports);
        } else if (req.query["type"] == 'daily') {
            download(req, res, {
                data: data.rows[0],
                data1: data.rows[1][0],
                data2: data.rows[2][0],
                params: req.query
            }, { 'all': 'invoice/dailyinvoicerpt.html' }, reportsapi.getReports);
        }
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 3)
}

order.getOrderDetailsExport = function getOrderDetailsExport(req, res, done) {
    db.callProcedure("select " + globals.menuschema("funget_orderdetails_export") + "($1,$2,$3::json);", ['ord1', 'ord2', req.query], function(data) {
        download(req, res, {
            data: data.rows[0],
            data1: data.rows[1],
            params: req.query
        }, { 'all': 'invoice/menuinvoicerpt.html' }, reportsapi.getReports);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 2)
}