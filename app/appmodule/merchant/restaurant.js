var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var restaurant = module.exports = {};

restaurant.getRestaurantMaster = function getRestaurantMaster(req, res, done) {
    db.callProcedure("select " + globals.merchant("funget_restmaster") + "($1,$2::json);", ['c1', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}

restaurant.getRestaurantDetails = function getRestaurantDetails(req, res, done) {
    db.callProcedure("select " + globals.merchant("funget_restdtls") + "($1,$2,$3,$4::json);", ['c1', 'c2', 'c3', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 3)
}

restaurant.saveRestaurantMaster = function saveRestaurantMaster(req, res, done) {
    db.callFunction("select " + globals.merchant("funsave_restmaster") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}