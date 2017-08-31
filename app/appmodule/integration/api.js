var db = require("db");
const gen = require("gen");
var globals = gen.globals;

var rs = gen.res;
const encr = gen.encr;

var integration = module.exports = {};


integration.getIntegration = function getIntegration(req, res, done) {
    db.callProcedure("select " + globals.merchant("funget_integration") + "($1,$2::json);", ['bi', req.body], function (data) {
        rs.resp(res, 200, data.rows);
    }, function (err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}


integration.generetKey = function generetKey(req, res, done) {
    req.body.flag = "getkey";
    db.callFunction("select " + globals.merchant("funsave_integration") + "($1::json);", [req.body], function (data) {
        //rs.resp(res, 200, data.rows[0].funsave_integration);
        integration.saveKey(req, res, done, data.rows[0].funsave_integration);

    }, function (err) {
        rs.resp(res, 401, "error : " + err);
    })
}

integration.saveKey = function saveKey(req, res, done, key) {
    //console.log();
    req.body.keyncr = encr.encrypt(key.key);
    req.body.keydecr = key.key;
    req.body.expiry = new Date();
    req.body.flag = "";
    //rs.resp(res, 200, encr.encrypt(key.key));

    db.callFunction("select " + globals.merchant("funsave_integration") + "($1::json);", [req.body], function (data) {
        rs.resp(res, 200, data.rows[0].funsave_integration);
    }, function (err) {
        rs.resp(res, 401, "error : " + err);
    })
}