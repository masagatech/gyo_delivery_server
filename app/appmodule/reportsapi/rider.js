var db = require("db");
const gen = require("gen");
var rs = gen.res;
var globals = gen.globals;

var download = gen.download;

// download details

var rider = module.exports = {};
var riderapi = require("../../reports/templates/rider/rider.js");
var reportsapi = require("../../reports/apis/reports.js");

// Rider Attendance Reports

rider.getRiderAttendance = function getRiderAttendance(req, res, done) {
    try {
        db.callProcedure("select " + globals.merchant("funget_reports") + "($1,$2,$3,$4::json);", ['cus1', 'cus2', 'cus3', req.query], function(data) {
            if (req.query["flag"] == 'rider_attendence_report') {
                download(req, res, {
                    data: data.rows[0],
                    data1: data.rows[1][0],
                    params: req.query
                }, { 'all': 'rider/riderattendence-pdf.html' }, riderapi.attendence);
            } else if (req.query["flag"] == 'rider_attendence_monthly_report') {
                download(req, res, {
                    data: data.rows[0],
                    data1: data.rows[1][0],
                    data2: data.rows[2],
                    params: req.query
                }, { 'all': 'rider/ridermonthlyattendence-pdf.html' }, riderapi.monthlyAttendence);
            } else if (req.query["flag"] == 'rider_order_report') {
                download(req, res, {
                    data: data.rows[0],
                    data1: data.rows[1][0],
                    data2: data.rows[2],
                    params: req.query
                }, { 'all': 'rider/monthlyorder-pdf.html' }, riderapi.monthlyOrders);
            }
        }, function(err) {
            rs.resp(res, 401, "error : " + err);
        }, 3)

    } catch (error) {
        console.log(error);
    }
}

// Rider Order History

rider.getRiderOrderHistory = function getRiderOrderHistory(req, res, done) {
    try {
        db.callProcedure("select " + globals.merchant("funget_rpt_orderreports") + "($1,$2,$3,$4::json);", ['ord1', 'ord2', 'ord3', req.query], function(data) {
            download(req, res, {
                data: data.rows[0],
                data1: data.rows[1],
                data2: data.rows[2],
                params: req.query
            }, { 'all': 'rider/orderhistory.html' }, reportsapi.getReports);
        }, function(err) {
            rs.resp(res, 401, "error : " + err);
        }, 3)
    } catch (error) {
        console.log(error);
    }
}