var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var owner = module.exports = {};

owner.saveOwnerInfo = function saveOwnerInfo(req, res, done) {
    db.callFunction("select " + globals.schema("funsave_ownerinfo") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

owner.getOwnerDetails = function getOwnerDetails(req, res, done) {
    db.callProcedure("select " + globals.schema("funget_ownerdetails") + "($1,$2::json);", ['own', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}