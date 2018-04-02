var reportPath = "../reports/apis/";
var appmodulePath = "../appmodule/merchant/";
var menuapiPath = "../appmodule/menuapi/";

// report modules

var testRpt = require(reportPath + "testrep.js");
var reports = require(appmodulePath + "reports.js");
var order = require(appmodulePath + "order.js");
var orderreport = require(appmodulePath + "orderreport.js");

var menuorder = require(menuapiPath + "order.js");

module.exports = function(app) {
    app.get("/test", testRpt.getrep);
    app.get("/exportDayEndReports", reports.exportDayEndReports);
    app.get("/exportMerchantLedgerReports", reports.exportMerchantLedgerReports);
    app.get("/exportBankReports", reports.exportBankReports);

    app.get("/exportInvoiceReports", reports.exportInvoiceReports);
    app.get("/getMerchantOrderReports", reports.getMerchantOrderReports);

    app.get("/getRiderReports", order.downloadOrderDetails);
    app.get("/getOrderReport", orderreport.getOrderReport);

    app.get("/getOrderDetailsExport", menuorder.getOrderDetailsExport);
}