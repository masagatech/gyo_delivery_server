var db = require("db");
const gen = require("gen");
var rs = gen.res;

var http = require('http');
var nodemailer = require('nodemailer');

var sms_email = module.exports = {};

sms_email.sendSMS = function sendSMS(req, res, done) {
    var url = 'http://sms.cell24x7.com:1111/mspProducerM/sendSMS';

    var _sms_username = req.query.sms_username ? req.query.sms_username : '';
    var _sms_password = req.query.sms_password ? req.query.sms_password : '';
    var _sms_sendername = req.query.sms_sendername ? req.query.sms_sendername : '';

    var _to = req.query._to ? req.query._to : '';
    var _msg = req.query._msg ? req.query._msg : '';

    url += '?user=' + _sms_username;
    url += '&pwd=' + _sms_password;
    url += '&sender=' + _sms_sendername;
    url += '&mt=2';
    url += '&mobile=' + _to;
    url += '&msg=' + _msg;
    url = url.replace(/ /g, "%20");

    var req = http.get(url, function(res) {
        var data = '';

        res.on('data', function(chunk) {
            data += chunk;
        });
    }).end();
}

// Email

sms_email.sendEmail = function sendEmail(req, res, done) {
    // var _mail_via = "smtp";
    // var _mail_smtp_host = "md-in-50.webhostbox.net";
    // var _mail_smtp_port = "465";
    // var _mail_smtp_username = "noreply@goyo.in";
    // var _mail_smtp_password = "noreply@123";

    // var _mail_from_name = "GoYo";
    // var _mail_from_email = "noreply@goyo.in";

    // var _result = {
    //     email: { "j_title": "Hello" },
    //     template: {},
    // };

    var _mail_via = req.query.mail_via ? req.query.mail_via : '';
    var _mail_smtp_host = req.query.mail_smtp_host ? req.query.mail_smtp_host : '';
    var _mail_smtp_port = req.query.mail_smtp_port ? req.query.mail_smtp_port : '';
    var _mail_smtp_username = req.query.mail_smtp_username ? req.query.mail_smtp_username : '';
    var _mail_smtp_password = req.query.mail_smtp_password ? req.query.mail_smtp_password : '';

    var _mail_from_name = req.query.mail_from_name ? req.query.mail_from_name : '';
    var _mail_from_email = req.query.mail_from_email ? req.query.mail_from_email : '';

    var _to = req.query._to ? req.query._to : '';
    var _subject = req.query._subject ? req.query._subject : '';
    var _msg = req.query._msg ? req.query._msg : '';


    let transporter = nodemailer.createTransport({
        service: _mail_via,
        host: _mail_smtp_host,
        port: parseInt(_mail_smtp_port),
        auth: {
            user: _mail_smtp_username,
            pass: _mail_smtp_password
        }
    });

    // setup email data with unicode symbols

    let mailOptions = {
        to: _to,
        from: '"' + _mail_from_name + ' " <' + _mail_from_email + '>',
        subject: _subject,
        html: _msg,
        text: '',
    };

    // send mail with defined transport object

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log(info);
        }
    });
}