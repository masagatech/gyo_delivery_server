var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var menus = module.exports = {};

menus.saveMenuInfo = function saveMenuInfo(req, res, done) {
    db.callFunction("select " + globals.schema("funsave_menuinfo") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

menus.getMenuDetails = function getMenuDetails(req, res, done) {
    db.callProcedure("select " + globals.schema("funget_menudetails") + "($1,$2::json);", ['menu', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}

menus.getMenuAccess = function getMenuAccess(req, res, done) {
    db.callProcedure("select " + globals.schema("funget_menuaccess") + "($1,$2::json);", ['macc', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}