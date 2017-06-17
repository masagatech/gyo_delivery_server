var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var gmap = module.exports = {};

gmap.getmapData = function getmapData(req, res, done) {
    db.callProcedure("select " + globals.merchant("api_funget_gmapdata") + "($1,$2,$3,$4::json);", ['gmp1','gmp2','gmp3', req.query], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 3)
}

