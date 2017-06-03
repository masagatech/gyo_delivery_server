var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var hotspot = module.exports = {};

hotspot.saveHotspotInfo = function saveHotspotInfo(req, res, done) {
    db.callFunction("select " + globals.merchant("funsave_hotspotinfo") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

hotspot.getHotspotDetails = function getHotspotDetails(req, res, done) {
    db.callProcedure("select " + globals.merchant("funget_hotspotdetails") + "($1,$2::json);", ['htsp', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}