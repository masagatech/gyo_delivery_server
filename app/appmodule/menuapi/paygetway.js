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

// Day End

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

    console.log(url);

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

            console.log(_data.ccnum);
            console.log(_data.bankcode);

            var html = paymentapi.getPaymentModule(_data, globals);

            pres.set('Content-Type', 'text/html');
            pres.status(200).send(html);
        });
    }).end();
}