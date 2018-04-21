var db = require("db");
const gen = require("gen");
var rs = gen.res;
var globals = gen.globals;

var download = gen.download;

// download details

var rider = module.exports = {};
var riderapi = require("../../reports/templates/rider/rider.js");
var reportsapi = require("../../reports/apis/reports.js");

// Rider Reports

rider.getRiderReports = function getRiderReports(req, res, done) {
    try {
        db.callProcedure("select " + globals.merchant("funget_rpt_riderreports") + "($1,$2,$3,$4::json);", ['cus1', 'cus2', 'cus3', req.query], function(data) {
            if (req.query["flag"] == 'attendance') {
                download(req, res, {
                    data: data.rows[0],
                    data1: data.rows[1][0],
                    params: req.query
                }, { 'all': 'rider/attendance.html' }, riderapi.attendence);
            } else if (req.query["flag"] == 'monthlyattendance') {
                download(req, res, {
                    data: data.rows[0],
                    data1: data.rows[1][0],
                    data2: data.rows[2],
                    params: req.query
                }, { 'all': 'rider/monthlyattendance.html' }, riderapi.monthlyAttendence);
            } else if (req.query["flag"] == 'monthlyorder') {
                download(req, res, {
                    data: data.rows[0],
                    data1: data.rows[1][0],
                    data2: data.rows[2],
                    params: req.query
                }, { 'all': 'rider/monthlyorder.html' }, riderapi.monthlyOrders);
            } else if (req.query["flag"] == 'orderhistory') {
                download(req, res, {
                    data: data.rows[0],
                    data1: data.rows[1],
                    data2: data.rows[2],
                    params: req.query
                }, { 'all': 'rider/orderhistory.html' }, reportsapi.getReports);
            } else if (req.query["flag"] == 'salary') {
                download(req, res, {
                    data: data.rows[0],
                    data1: data.rows[1],
                    data2: data.rows[2],
                    params: req.query
                }, { 'all': 'rider/ridersalary.html' }, riderapi.salaryDetails);
            } else {
                rs.resp(res, 200, data.rows);
            }
        }, function(err) {
            rs.resp(res, 401, "error : " + err);
        }, 3)

    } catch (error) {
        console.log(error);
    }
}