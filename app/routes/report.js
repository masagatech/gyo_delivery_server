var reportPath = "../reports/apis/";
var appmodulePath = "../appmodule/merchant/";

//report modules
var testRpt = require(reportPath + "testrep.js");
var order = require(appmodulePath + "order.js");

// var bbRpt = require(reportPath + "bankbook/bbrpt.js");;

module.exports = function(app) {
    app.get("/test", testRpt.getrep);
    app.get("/riderreports", order.downloadOrderDetails);
    // app.get("/repo", testRpt.getrep);
    // app.get("/bankbook", bbRpt.getRptBankBook);
}