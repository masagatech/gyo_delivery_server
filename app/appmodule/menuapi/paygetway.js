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

var _uid, _utype, _ordid, _cardtype, _bankcode;

payment.saveTransaction = function saveTransaction(req, res) {
    req.body.autoid = 0;
    req.body.txndetails = JSON.stringify(req.body);
    req.body.uid = _uid;
    req.body.utype = _utype;
    req.body.ordid = _ordid;
    req.body.cardtype = _cardtype;
    req.body.bankcode = _bankcode;

    db.callFunction("select " + globals.menuschema("funsave_transaction") + "($1::json);", [req.body], function(data) {
        var _d = data.rows[0].funsave_transaction

        if (req.body.utype == "customer") {
            if (req.body.status == "success") {
                res.redirect(globals.menuurl + 'trackorder/' + req.body.txnid);
            } else {
                res.redirect(globals.menuurl + 'mycart/' + _d.autoid);
            }
        } else {
            if (req.body.status == "success") {
                res.redirect(globals.adminurl + 'order/paymentdetails/' + req.body.txnid);
            } else {
                res.redirect(globals.adminurl + 'order/makepayment/' + _d.autoid);
            }
        }
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

// Payment Getway

payment.postGetwayForm = function postGetwayForm(req, res, done) {
    req.body.flag = "getway";

    console.log(req.body);

    if (req.body.ordkey === undefined || req.body.ordkey === '') { res.status(200).send("ordkey is required!"); return };
    if (req.body.uid === undefined || req.body.uid === 0) { res.status(200).send("uid is required!"); return };
    if (req.body.utype === undefined || req.body.utype === '') { res.status(200).send("utype is required!"); return };

    db.callProcedure("select " + globals.menuschema("funget_orderdetails") + "($1,$2::json);", ['payment1', req.body], function(data) {
        var _data = data.rows[0];

        _ordid = _data.ordid;
        _uid = _data.uid;
        _utype = _data.utype;

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

            _cardtype = preq.body.pg;
            _bankcode = preq.body.bankcode;

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