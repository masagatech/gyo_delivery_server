var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var user = module.exports = {};

// User Master

user.saveUserInfo = function saveUserInfo(req, res, done) {
    db.callFunction("select " + globals.schema("funsave_userinfo") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

user.getUserDetails = function getUserDetails(req, res, done) {
    db.callProcedure("select " + globals.schema("funget_userdetails") + "($1,$2::json);", ['u', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}

// User Rights

user.saveUserRights = function saveUserRights(req, res, done) {
    db.callFunction("select " + globals.schema("funsave_userrights") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

user.getUserRights = function getUserRights(req, res, done) {
    db.callProcedure("select " + globals.schema("funget_userrights") + "($1,$2::json);", ['ur', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}