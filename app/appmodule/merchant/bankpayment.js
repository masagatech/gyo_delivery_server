var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var bankpayment = module.exports = {};

bankpayment.saveBankPaymentInfo = function saveBankPaymentInfo(req, res, done) {
    db.callFunction("select " + globals.merchant("funsave_bankpayment") + "($1::json);", [req.body], function (data) {
        rs.resp(res, 200, data.rows);
    }, function (err) {
        rs.resp(res, 401, "error : " + err);
    })
}

bankpayment.getBankPaymentDetails = function getBankPaymentDetails(req, res, done) {
    db.callProcedure("select " + globals.merchant("funget_bankpaymentdetails") + "($1,$2::json);", ['bankpayment', req.body], function (data) {
        rs.resp(res, 200, data.rows);
    }, function (err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}

bankpayment.bankpaymentbulkUpload = function bankpaymentbulkUpload(data1, callback) {
    var param = data1.params;
    var data2 = data1.data

    db.callFunction("select " + globals.merchant("funbulkupload_bankpayment") + "($1::json,$2::json);", [param, data2], function (res) {
        callback({
            data: res.rows
        })
    }, function (err) {
        callback({
            data: "error : " + err
        })
    });


    // callback({
    //     data :""
    // })

}