var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var school = module.exports = {};

school.saveSchoolInfo = function saveSchoolInfo(req, res, done) {
    db.callFunction("select " + globals.schema("funsave_schoolinfo") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

school.getSchoolDetails = function getSchoolDetails(req, res, done) {
    db.callProcedure("select " + globals.schema("funget_schooldetails") + "($1,$2::json);", ['sch', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}