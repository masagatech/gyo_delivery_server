var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;
var category = module.exports = {};

category.saveCategory = function saveCategory(req, res, done) {
    db.callFunction("select " + globals.merchant("funsave_category") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

category.saveSubCategory = function saveSubCategory(req, res, done) {
    db.callFunction("select " + globals.merchant("funsave_subcategory") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}