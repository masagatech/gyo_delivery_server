var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var trip = module.exports = {};
var sms_email = require("../schoolapi/sendsms_email.js");

var http = require('http');

// Send Email

function sendSMS(_sms_username, _sms_password, _sms_sendername, _to, _msg) {
    var params = "?sms_username" + _sms_username +
        "&sms_password" + _sms_password +
        "&sms_sendername" + _sms_sendername +
        "&_to" + _to +
        "&_msg" + _msg;

    // sms_email.sendSMS(params);

    var url = globals.apiurl + "sendSMS?sms_username=" + _sms_username + "&sms_password=" + _sms_password +
        "&sms_sendername=" + _sms_sendername + "&_to=" + _to + "&_msg=" + _msg

    var req = http.get(url, function(res) {
        // console.log(res);
    });
}

// Send SMS

function sendEmail(_mail_via, _mail_smtp_host, _mail_smtp_port, _mail_smtp_username, _mail_smtp_password, _mail_from_name, _mail_from_email, _to, _subject, _msg) {
    var params = "?mail_via=" + _mail_via +
        "&mail_smtp_host=" + _mail_smtp_host +
        "&mail_smtp_port=" + _mail_smtp_port +
        "&mail_smtp_username=" + _mail_smtp_username +
        "&mail_smtp_password=" + _mail_smtp_password +
        "&mail_from_name=" + _mail_from_name +
        "&mail_from_email=" + _mail_from_email +
        "&_to=" + _to +
        "&_subject=" + _subject +
        "&_msg=" + _msg

    var url = globals.apiurl + "sendEmail" + params;

    var req = http.get(url, function(res) {
        // console.log(res);
    });

    // sms_email.sendEmail(params);
}


trip.getEmailSMS_Setting = function getEmailSMS_Setting(_data, res) {
    db.callProcedure("select " + globals.schema("funget_emailsms_setting") + "($1,$2::json);", ['es', _data], function(data) {
        var dstr = JSON.stringify(data.rows[0]);
        var d = JSON.parse(dstr);

        console.log(d);

        // Send SMS

        var _sms_username = d.sms_username;
        var _sms_password = d.sms_password;
        var _sms_sendername = d.sms_sendername;
        var _sms_to = "8879961590";
        var _sms_body = d.sms_body;

        sendSMS(_sms_username, _sms_password, _sms_sendername, _sms_to, _sms_body);

        // Send Email

        var _mail_via = d.mail_via;
        var _mail_smtp_host = d.mail_smtp_host;
        var _mail_smtp_port = d.mail_smtp_port;
        var _mail_smtp_username = d.mail_smtp_username;
        var _mail_smtp_password = d.mail_smtp_password;
        var _mail_from_name = d.mail_from_name;
        var _mail_from_email = d.mail_from_email;

        var _mail_to = "vivek.pandey5188@gmail.com";
        var _mail_subject = d.subject;
        var _mail_body = d.mail_body;

        sendEmail(_mail_via, _mail_smtp_host, _mail_smtp_port, _mail_smtp_username, _mail_smtp_password, _mail_from_name, _mail_from_email, _mail_to, _mail_subject, _mail_body);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}

trip.setTripAction = function setTripAction(req, res, done) {
    db.callFunction("select " + globals.merchant("api_funsave_trip_actions") + "($1::json);", [req.body], function(data) {
        var _d = data.rows[0].api_funsave_trip_actions;
        rs.resp(res, 200, _d);

        console.log(req.body["flag"]);

        if (req.body["flag"] == 'delvr') {
            var params = {
                "flag": "delvorder",
                "username": _d.uname,
                "ordno": _d.ordno,
                "ordkey": _d.ordkey
            };

            console.log(params);

            trip.getEmailSMS_Setting(params);
        }
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}