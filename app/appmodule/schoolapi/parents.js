var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var parent = module.exports = {};
// get my kids
parent.mykids = function(req, res, done) {
    db.callProcedure("select " + globals.schema("funget_api_mykids") + "($1,$2::json);", ['mykids', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1);
}

// activate the kids
parent.activatekid = function(req, res, done) {
    db.callFunction("select " + globals.schema("funsave_api_userstudmap") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows[0].funsave_api_userstudmap);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    });
}