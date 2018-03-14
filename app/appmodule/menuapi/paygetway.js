var db = require("db");
const gen = require("gen");

var rs = gen.res;
var globals = gen.globals;
var socket = require("socket");
var download = gen.download;

var http = require('http');

var payment = module.exports = {};
var order = require("../menuapi/order.js");

var paymentapi = require("../../paymentgetway/helper.js");

// Transaction

payment.saveTransaction = function saveTransaction(req, res) {
    req.body.autoid = 0;
    req.body.txndetails = JSON.stringify(req.body);

    db.callFunction("select " + globals.menuschema("funsave_transaction") + "($1::json);", [req.body], function(data) {
        var _d = data.rows[0].funsave_transaction

        if (req.body.status == "failure") {
            res.redirect(globals.fronturl + 'mycart/' + _d.autoid);
        } else {
            res.redirect(globals.fronturl + 'trackorder/' + req.body.txnid);
        }
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

// Payment Getway

payment.postGetwayForm = function postGetwayForm(req, res, done) {
    req.body.flag = "getway";

    if (req.body.ordkey === undefined) { res.status(200).send("ordkey is resuired!"); return };
    if (req.body.uid === undefined) { res.status(200).send("uid is resuired!"); return };

    db.callProcedure("select " + globals.menuschema("funget_orderdetails") + "($1,$2::json);", ['payment1', req.body], function(data) {
        var _data = data.rows[0];
        getPayuBizHashes(_data, req, res);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}

function getPayuBizHashes(_data, preq, pres) {
    var url = globals.mainapiurl + 'getPayuBizHashes';

    url += '?login_id=' + preq.body.uid;
    url += '&key=' + _data.payukey;
    url += '&txnid=' + _data.txnid;
    url += '&amount=' + _data.totpayamt;
    url += '&productinfo=' + _data.productinfo;
    url += '&firstname=' + _data.firstname;
    url += '&email=' + _data.email;
    url += '&phone=' + _data.phone;
    url += '&user_credentials=' + _data.payukey + ":" + _data.email;
    url += '&flag=web';

    var req = http.get(url, function(res) {
        var data = '';

        res.on('data', function(chunk) {
            data += chunk;
            var _d = JSON.parse(data);

            _data.hash = _d.data.payment_hash;
            _data.pg = preq.body.pg;
            _data.ccnum = preq.body.ccnum;
            _data.ccname = preq.body.ccname;
            _data.ccvv = preq.body.ccvv;
            _data.ccexpmon = preq.body.ccexpmon;
            _data.ccexpyr = preq.body.ccexpyr;
            _data.bankcode = preq.body.bankcode;

            var html = paymentapi.getPaymentModule(_data, globals);

            pres.set('Content-Type', 'text/html');
            pres.status(200).send(html);
        });
    }).end();
}