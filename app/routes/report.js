var reportPath = "../reports/apis/";
var appmodulePath = "../appmodule/merchant/";

// report modules

var testRpt = require(reportPath + "testrep.js");
var reports = require(appmodulePath + "reports.js");
var order = require(appmodulePath + "order.js");
var orderreport = require(appmodulePath + "orderreport.js");

// var bbRpt = require(reportPath + "bankbook/bbrpt.js");;

module.exports = function(app) {
    app.get("/test", testRpt.getrep);
    app.get("/exportInvoiceDetails", reports.exportInvoiceDetails);

    app.get("/getInvoiceDetailsExport", reports.getInvoiceDetailsExport);
    app.get("/riderreports", order.downloadOrderDetails);
    app.get("/getOrderReport", orderreport.getOrderReport);
}