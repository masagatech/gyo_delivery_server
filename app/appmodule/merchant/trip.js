var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var trip = module.exports = {};
var sms_email = require("../schoolapi/sendsms_email.js");

trip.setTripAction = function setTripAction(req, res, done) {
    db.callFunction("select " + globals.merchant("api_funsave_trip_actions") + "($1::json);", [req.body], function(data) {
        var _d = data.rows[0].api_funsave_trip_actions;
        rs.resp(res, 200, _d);

        if (req.query["flag"] == 'delvr') {
            var params = {
                "flag": "delvorder",
                "username": _d.uname,
                "ordno": _d.ordno,
                "totpayamt": _d.totpayamt,
                "delv_minute": _d.delvminute,
                "ordkey": _d.ordkey
            };

            sms_email.getEmailSMS_Setting(params);
        }
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}