var reportPath = "../reports/apis/";

//report modules
var testRpt = require(reportPath + "testrep.js");
// var bbRpt = require(reportPath + "bankbook/bbrpt.js");;

module.exports = function(app) {
    app.get("/test", testRpt.getrep);
    // app.get("/repo", testRpt.getrep);
    // app.get("/bankbook", bbRpt.getRptBankBook);

}