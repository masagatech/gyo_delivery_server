var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var livebeat = module.exports = {};

livebeat.savelivebeat = function savelivebeat(req, res, done) {
    db.callFunction("select " + globals.merchant("api_funsave_riderlive") + "($1::json);", [req.query], function(data) {
        rs.resp(res, 200, data.rows[0].api_funsave_riderlive);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}