var db = require("db");
const gen = require("gen");
var rs = gen.res;
var globals = gen.globals;
var socket = require("socket");
var download = gen.download;

var dayend = module.exports = {};

dayend.getDayEndReports = function getDayEndReports(req, res, done) {
    db.callProcedure("select " + globals.merchant("funget_rpt_dayend") + "($1,$2::json);", ['de', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}

dayend.getInvoiceDetails = function getInvoiceDetails(req, res, done) {
    db.callProcedure("select " + globals.merchant("funget_rpt_invoice") + "($1,$2::json);", ['de', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}

// template api name

var invoicereportapi = require("../../reports/apis/invoice.js");

dayend.getInvoiceDetailsExport = function getInvoiceDetailsExport(req, res, done) {
    db.callProcedure("select " + globals.merchant("funget_rpt_invoice_export") + "($1,$2,$3,$4::json);", ['de', 'de1', 'de2', req.query], function(data) {
        if (req.query["type"] == 'weekly') {
            download(req, res, { data: data.rows[0], data1: data.rows[1][0], data2: data.rows[2][0], params: req.query }, { 'all': 'invoice/weeklyinvoicerpt.html' }, invoicereportapi.invoiceDetails);
        } else if (req.query["type"] == 'daily') {
            download(req, res, { data: data.rows[0], data1: data.rows[1][0], data2: data.rows[2][0], params: req.query }, { 'all': 'invoice/dailyinvoicerpt.html' }, invoicereportapi.invoiceDetails);
        }
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 3)
}

dayend.exportInvoiceDetails = function exportInvoiceDetails(req, res, done) {
    db.callProcedure("select " + globals.merchant("funget_rpt_invoice") + "($1,$2::json);", ['eid', req.query], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}
dayend.getOlBankReports = function getOlBankReports(req, res, done) {
    db.callProcedure("select " + globals.merchant("funget_rpt_olbankdetailsreports") + "($1,$2::json);", ['bank', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}
dayend.getMerchantLedgerReports = function getMerchantLedgerReports(req, res, done) {
    db.callProcedure("select " + globals.merchant("funget_rpt_merchantledgerreports") + "($1,$2::json);", ['bank', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}