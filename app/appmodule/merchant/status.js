var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var status = module.exports = {};

status.getStatus = function getStatus(req, res, done) {
    db.callFunction("select " + globals.merchant("api_funget_status") + "($1::json);", [req.query], function(data) {
        rs.resp(res, 200, data.rows[0].api_funget_status);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

status.setStatus = function setStatus(req, res, done) {
    db.callFunction("select " + globals.merchant("api_funset_status") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows[0].api_funset_status);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

