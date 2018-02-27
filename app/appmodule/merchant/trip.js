var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var trip = module.exports = {};
var sms_email = require("../schoolapi/sendsms_email.js");

trip.setTripAction = function setTripAction(req, res, done) {
    db.callFunction("select " + globals.merchant("api_funsave_trip_actions") + "($1::json);", [req.body], function(data) {
        var _d = data.rows[0].api_funsave_trip_actions;
        rs.resp(res, 200, _d);

        if (req.body["flag"] == 'delvr') {
            var _uname = _d.uname;
            var _uphone = _d.uphone;
            var _uemail = _d.uemail;
            var _ordno = _d.ordno;
            var _ordkey = _d.ordkey;

            var params = {
                "flag": "delvorder",
                "username": _uname,
                "ordno": _ordno,
                "ordkey": _ordkey
            };

            sms_email.sendEmailAndSMS(params, _uphone, _uemail);
        }
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}