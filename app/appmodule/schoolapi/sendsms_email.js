var db = require("db");
const gen = require("gen");
var globals = gen.globals;
var rs = gen.res;

var http = require('http');
var nodemailer = require('nodemailer');

var sms_email = module.exports = {};

// Send SMS

function sendSMS(_sms_username, _sms_password, _sms_sendername, _to, _msg) {
    var url = 'http://sms.cell24x7.com:1111/mspProducerM/sendSMS';

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

// Send Email

function sendEmail(_mail_via, _mail_smtp_host, _mail_smtp_port, _mail_smtp_username, _mail_smtp_password, _mail_from_name, _mail_from_email, _to, _subject, _msg) {
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

// Send SMS / Email

sms_email.sendEmailAndSMS = function sendEmailAndSMS(_data, _sms_to, _mail_to, res) {
    db.callProcedure("select " + globals.schema("funget_emailsms_setting") + "($1,$2::json);", ['es', _data], function(data) {
        var dstr = JSON.stringify(data.rows[0]);
        var d = JSON.parse(dstr);

        // Send SMS

        var _sms_username = d.sms_username;
        var _sms_password = d.sms_password;
        var _sms_sendername = d.sms_sendername;
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

        var _mail_subject = d.subject;
        var _mail_body = d.mail_body;

        sendEmail(_mail_via, _mail_smtp_host, _mail_smtp_port, _mail_smtp_username, _mail_smtp_password, _mail_from_name, _mail_from_email, _mail_to, _mail_subject, _mail_body);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}