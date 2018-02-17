var rs = require("../appmodule/util/resp.js");
var globals = require("../globals.js");
var fs = require('fs');
var sha512 = require('js-sha512');

var cust = require("../appmodule/menuapi/customer.js");
var fy = require("../appmodule/menuapi/financialyear.js");
var holiday = require("../appmodule/menuapi/holiday.js");
var gst = require("../appmodule/menuapi/gstsetting.js");
var items = require("../appmodule/menuapi/items.js");
var order = require("../appmodule/menuapi/order.js");

var outlet = require('../appmodule/merchant/outlet.js');
var addrsearch = require("../appmodule/menuapi/addresssearch.js")

var multer = require('multer');

var root = globals.globvar.rootAPI + "/menu";

var appRouter = function(app) {
    //##################################### API Details / ###################################################

    var APIInfo = {
        ver: "1.0",
        type: "REST API",
        requestdata: "JSON",
        responsedata: "JSON",
    }

    app.post(globals.globvar.rootAPI + "/", function(req, res, done) {
        console.log(req.body)
        rs.resp(res, 200, APIInfo);
    });

    // Payment Details

    app.post(root + '/createHash', function(req, res) {
        var salt = 'eCwWELxi';
        var hash = sha512(req.body.preHashString + salt);
        console.log("data : " + hash);
        res.send({ success: true, hash: hash });
    });

    app.post(root + '/payment_success', function(req, res) {
        console.log(req.body);
        res.send(req.body.status);
    })

    //##################################### API Details / ###################################################


    //##################################### VIVEK ###########################################################

    //##################################### Customer ##################################################

    app.post(root + "/saveCustomerLogin", cust.saveCustomerLogin);

    //##################################### Customer ##################################################

    //##################################### Financial Year ##################################################

    app.post(root + "/saveFinancialYear", fy.saveFinancialYear);
    app.post(root + "/getFinancialYear", fy.getFinancialYear);

    //##################################### Financial Year ##################################################

    //##################################### Holiday #########################################################

    app.post(root + "/saveHoliday", holiday.saveHoliday);
    app.post(root + "/getHoliday", holiday.getHoliday);

    //##################################### Holiday #########################################################

    app.get(root + "/getOutletAreaWise", outlet.getOutletAreaWise);

    //##################################### Items ###########################################################

    app.post(root + "/saveItemInfo", items.saveItemInfo);
    app.post(root + "/saveAddonInfo", items.saveAddonInfo);
    app.post(root + "/getItemDetails", items.getItemDetails);
    app.post(root + "/getAddonDetails", items.getAddonDetails);

    //##################################### Items ###########################################################

    //##################################### Order ###########################################################

    app.post(root + "/saveOrderDelivery", order.saveOrderDelivery);
    app.post(root + "/saveValidOrder", order.saveValidOrder);
    app.post(root + "/saveOrderInfo", order.saveOrderInfo);
    app.post(root + "/getOrderDetails", order.getOrderDetails);
    app.get(root + "/getOrderDetailsExport", order.getOrderDetailsExport);

    //##################################### Order ###########################################################

    //##################################### Order Rating ####################################################

    app.post(root + "/saveOrderRating", order.saveOrderRating);
    app.post(root + "/getOrderRating", order.getOrderRating);

    //##################################### Order Rating ####################################################

    //##################################### GST Setting #####################################################

    app.post(root + "/saveGSTSetting", gst.saveGSTSetting);
    app.post(root + "/getGSTSetting", gst.getGSTSetting);

    //##################################### GST Setting #####################################################

    //##################################### Address Search ##################################################

    app.get(globals.globvar.rootAPI + "/searchAddress", addrsearch.searchAddress);

    //##################################### Address Search ##################################################

    //##################################### VIVEK ###########################################################
}

module.exports = appRouter;