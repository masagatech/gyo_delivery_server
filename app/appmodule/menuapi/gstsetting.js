var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var gstset = module.exports = {};

// GST Setting

gstset.saveGSTSetting = function saveGSTSetting(req, res, done) {
    db.callFunction("select " + globals.menuschema("funsave_gstsetting") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

gstset.getGSTSetting = function getGSTSetting(req, res, done) {
    db.callProcedure("select " + globals.menuschema("funget_gstsetting") + "($1,$2::json);", ['gst', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}