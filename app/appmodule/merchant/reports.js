var db = require("db");
const gen = require("gen");

var rs = gen.res;
var globals = gen.globals;
var socket = require("socket");
var download = gen.download;

var reports = module.exports = {};

var invoicereportapi = require("../../reports/apis/invoice.js");

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

// Invoice

reports.getInvoiceDetails = function getInvoiceDetails(req, res, done) {
    db.callProcedure("select " + globals.merchant("funget_rpt_invoice") + "($1,$2::json);", ['inv', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}

reports.exportInvoiceReports = function exportInvoiceReports(req, res, done) {
    db.callProcedure("select " + globals.merchant("funget_rpt_invoice_export") + "($1,$2,$3,$4::json);", ['inv1', 'inv2', 'inv3', req.query], function(data) {
        if (req.query["type"] == 'weekly') {
            download(req, res, {
                data: data.rows[0],
                data1: data.rows[1][0],
                data2: data.rows[2][0],
                params: req.query
            }, { 'all': 'invoice/weeklyinvoicerpt.html' }, invoicereportapi.invoiceDetails);
        } else if (req.query["type"] == 'daily') {
            download(req, res, {
                data: data.rows[0],
                data1: data.rows[1][0],
                data2: data.rows[2][0],
                params: req.query
            }, { 'all': 'invoice/dailyinvoicerpt.html' }, invoicereportapi.invoiceDetails);
        }
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 3)
}

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