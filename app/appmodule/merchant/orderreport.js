var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;
const gen = require("gen");
var download = gen.download;

var orderreport = module.exports = {};

// download details

var orderreportapi = require("../../reports/apis/order.js");

orderreport.getOrderReport = function getOrderReport(req, res, done) {
    try {
        db.callProcedure("select " + globals.merchant("funget_rpt_orderreports") + "($1,$2,$3,$4::json);", ['ord1', 'ord2', 'ord3', req.query], function(data) {
            download(req, res, {
                data: data.rows[0],
                data1: data.rows[1][0],
                params: req.query
            }, { 'all': 'order/orderhistory.html' }, orderreportapi.ordhistory);
        }, function(err) {
            rs.resp(res, 401, "error : " + err);
        }, 3)
    } catch (error) {
        console.log(error);
    }
}