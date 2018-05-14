var db = require("db");
const gen = require("gen");
var rs = gen.res;

var globals = gen.globals;
var download = gen.download;

var order = module.exports = {};
var reportsapi = require("../../reports/apis/reports.js");

// Menu Order

order.getMenuOrderReports = function getMenuOrderReports(req, res, done) {
    db.callProcedure("select " + globals.menuschema("funget_rpt_orderdetails") + "($1,$2,$3::json);", ['mord1', 'mord2', req.query], function(data) {
        var url = "";

        if (req.query.flag == "kot_sleep") {
            url = "order/kotsleep.html";
        } else {
            url = "invoice/menuinvoicerpt.html";
        }

        download(req, res, {
            data: data.rows[0],
            data1: data.rows[1],
            params: req.query
        }, { 'all': url, 'headerfooter': 'no' }, reportsapi.getReports);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 2)
}