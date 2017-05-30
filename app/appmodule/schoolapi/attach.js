var db = require("../db/dbservice.js");
var rs = require("./util/resp.js");
var globals = require("../globals.js");

var Attach = module.exports = {};

Attach.getAttach = function getAttach(req, res, done) {
    db.callProcedure("select " + globals.schema("funget_attach") + "($1,$2::json);", ['attach', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}

Attach.saveAttach = function saveAttach(req, res, done) {
    db.callFunction("select " + globals.schema("funsave_attach") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}