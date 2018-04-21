// Report Modules

var testRpt = require("../reports/apis/testrep.js");

var bankrpt = require('../appmodule/reportsapi/bank.js');
var orderrpt = require('../appmodule/reportsapi/order.js');
var dayendrpt = require('../appmodule/reportsapi/dayend.js');
var riderrpt = require('../appmodule/reportsapi/rider.js');
var merchantrpt = require('../appmodule/reportsapi/merchant.js');

module.exports = function(app) {
    app.get("/test", testRpt.getrep);

    // Bank

    app.get("/exportBankReports", bankrpt.exportBankReports);

    // Order

    app.get("/getOrderDetailsExport", orderrpt.getOrderDetailsExport);
    app.get("/exportInvoiceReports", orderrpt.exportInvoiceReports);

    // Day End

    app.get("/exportDayEndReports", dayendrpt.exportDayEndReports);

    // Merchant

    app.get("/exportMerchantLedgerReports", merchantrpt.exportMerchantLedgerReports);
    app.get("/getMerchantOrderReports", merchantrpt.getMerchantOrderReports);

    // Rider

    app.get("/getRiderReports", riderrpt.getRiderReports);
}