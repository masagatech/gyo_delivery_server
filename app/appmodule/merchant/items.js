var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var items = module.exports = {};

items.getItems = function getItems(req, res, done) {
    db.callProcedure("select pos.get_items($1,$2::json);", ['items', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

items.saveItems = function saveItems(req, res, done) {
    db.callFunction("select " + globals.merchant("funsave_items") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}