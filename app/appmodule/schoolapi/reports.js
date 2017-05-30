var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var pidr = module.exports = {};

pidr.getAttendanceReports = function getAttendanceReports(req, res, done) {
    db.callProcedure("select " + globals.schema("funget_rpt_attendance") + "($1,$2::json);", ['att', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}