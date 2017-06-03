var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var vehicle = module.exports = {};

vehicle.saveVehicleInfo = function saveVehicleInfo(req, res, done) {
    db.callFunction("select " + globals.schema("funsave_vehicleinfo") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

vehicle.getVehicleDetails = function getVehicleDetails(req, res, done) {
    db.callProcedure("select " + globals.schema("funget_vehicledetails") + "($1,$2::json);", ['veh', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}