var globals = require("gen").globals;
var fs = require('fs');

var dashboard = require("../appmodule/merchant/dashboard.js");
var hotspot = require('../appmodule/merchant/hotspot.js');
var rider = require('../appmodule/merchant/rider.js');
var merchant = require('../appmodule/merchant/merchant.js');
var payment = require('../appmodule/merchant/payment.js');
var ctwisedelvprice = require("../appmodule/merchant/ctwisedelvprice.js");
var ctwisebank = require("../appmodule/merchant/ctwisebank.js");
var outlet = require('../appmodule/merchant/outlet.js');
var order = require('../appmodule/merchant/order.js');
var mnlord = require('../appmodule/merchant/manualorder.js');
var dayend = require('../appmodule/merchant/dayend.js');
var customer = require('../appmodule/merchant/customer.js');
var bankpayment = require('../appmodule/merchant/bankpayment.js');
var reports = require('../appmodule/merchant/reports.js');

var orderdash = require('../appmodule/merchant/orderdashboard.js');
var mobile = require('../appmodule/merchant/mobile.js');
var ordallocation = require('../appmodule/merchant/orderallocation.js');
var status = require('../appmodule/merchant/status.js');

var notification = require('../appmodule/merchant/notification.js');
var trip = require('../appmodule/merchant/trip.js');

var gmap = require('../appmodule/merchant/gmap.js');

var integration = require('../routes/integration.js');
var integrationApi = require('../appmodule/integration/api.js');
var fs = require('fs');
var root = globals.globvar.rootAPI + "/mrcht";

var multer = require('multer');

var upload = multer({
    limits: {
        fieldNameSize: 999999999,
        fieldSize: 999999999
    },
    dest: 'www/mobile/mord'
});

var appRouter = function(app) {
    console.log(root);
    //############################ API Details ####################################################

    var APIInfo = {
        ver: "1.0",
        type: "REST API",
        requestdata: "JSON",
        responsedata: "JSON",
    }

    //#############################################################################################

    //############################ VIVEK / ########################################################

    //############################ Dashboard ######################################################

    app.post(root + "/getDashboard", dashboard.getDashboard);
    app.post(root + "/getDashboardNew", dashboard.getDashboard_new);

    //############################ Dashboard ######################################################

    //############################ Hotspot ########################################################

    app.post(root + "/getHotspotDetails", hotspot.getHotspotDetails);
    app.post(root + "/saveHotspotInfo", hotspot.saveHotspotInfo);

    //############################ Hotspot ########################################################

    //############################ Rider ##########################################################

    app.post(root + "/getRiderDetails", rider.getRiderDetails);
    app.post(root + "/saveRiderInfo", rider.saveRiderInfo);
    app.post(root + "/updateRdrWkOfDtls", rider.updateRdrWkOfDtls);

    //############################ Rider ##########################################################

    //############################ Merchant #######################################################

    app.post(root + "/getMerchantDetails", merchant.getMerchantDetails);
    app.post(root + "/saveMerchantInfo", merchant.saveMerchantInfo);

    //############################ Merchant #######################################################

    //############################ Payment ########################################################

    app.post(root + "/getPaymentDetails", payment.getPaymentDetails);
    app.post(root + "/savePaymentDetails", payment.savePaymentDetails);

    app.post(root + "/getUserCards", payment.getUserCards);
    app.post(root + "/saveUserCards", payment.saveUserCards);

    //############################ Merchant #######################################################

    //############################ Payment ########################################################

    app.post(root + "/getBankPaymentDetails", bankpayment.getBankPaymentDetails);
    app.post(root + "/saveBankPaymentInfo", bankpayment.saveBankPaymentInfo);

    //#############################################################################################

    //############################ Merchant #######################################################

    //############################ CityWiseDeliveryPrice ##########################################

    app.post(root + "/getCityWiseDeliveryPrice", ctwisedelvprice.getCityWiseDeliveryPrice);
    app.post(root + "/saveCityWiseDeliveryPrice", ctwisedelvprice.saveCityWiseDeliveryPrice);

    //############################ CityWiseDeliveryPrice ##########################################

    //############################ CityWiseBankDetail ##########################################

    app.post(root + "/getCityWiseBank", ctwisebank.getCityWiseBank);

    //############################ CityWiseBankDetail ##########################################

    //############################ Outlet #########################################################

    app.post(root + "/getOutletDetails", outlet.getOutletDetails);
    app.post(root + "/saveOutletInfo", outlet.saveOutletInfo);

    //############################ Outlet #########################################################

    //############################ Orders / #######################################################

    app.post(root + "/saveOrderInfo", order.saveOrderInfo);
    app.post(root + "/getOrderDetails", order.getOrderDetails);

    app.get(root + "/downloadOrderDetails", order.downloadOrderDetails);
    app.post(root + "/updateOrderDetails", order.updateOrderDetails);

    app.get(root + "/getDailyOrderDetails", order.getDailyOrderDetails);
    app.get(root + "/getFullOrderDetails", order.getFullOrderDetails);

    app.get(root + "/getOrders", order.getapiOrders);
    app.get(root + "/getOrdersCount", order.getapiOrdersCounts);

    app.post(root + "/getManualOrder", mnlord.getManualOrder);
    app.post(root + "/saveManualOrder", mnlord.saveManualOrder);

    //############################ Orders / #######################################################

    //############################ Day End / ######################################################

    app.post(root + "/saveDayEndInfo", dayend.saveDayEndInfo);
    app.post(root + "/getDayEndDetails", dayend.getDayEndDetails);

    //############################ Day End / ######################################################

    //############################ Customer / #####################################################

    app.post(root + "/getCustomerDetails", customer.getCustomerDetails);
    app.post(root + "/saveCustomerInfo", customer.saveCustomerInfo);

    //############################ Customer / #####################################################

    //############################ API TEST / #####################################################

    //############################ Orders API / ###################################################

    app.get(root + "/getOrderDash", orderdash.getOrderDash);
    app.post(root + "/getOrderDash", orderdash.postOrderDash);
    app.get(root + "/getAvailRider", rider.getAvailable);
    app.post(root + "/pushOrderToRider", ordallocation.sendorder);

    //############################ Orders API / ###################################################

    //############################ Rider API / ####################################################

    app.get(root + "/getDashOrdDetails", orderdash.getOrderDetails);

    //############################ Rider API / ####################################################

    //############################ Mobile API / ###################################################

    app.get(root + "/saveLiveBeat", mobile.savelivebeat);

    //############################ Mobile API / ###################################################

    //############################ Status / #######################################################

    app.get(root + "/getStatus", status.getStatus);
    app.post(root + "/setStatus", status.setStatus);

    //############################ Status / #######################################################

    //############################ Notify / #######################################################

    app.get(root + "/getNotify", notification.getNotify);
    app.post(root + "/createNotify", notification.createNotify);

    //############################ Notify / #######################################################

    //############################ trip / #########################################################

    app.post(root + "/setTripAction", trip.setTripAction);

    //############################ trip / #########################################################

    //############################ gmap / #########################################################

    app.get(root + "/getgMapData", gmap.getmapData);

    //############################ gmap / #########################################################

    //############################ Reports / ######################################################

    app.post(root + "/getDayEndReports", reports.getDayEndReports);
    app.post(root + "/getInvoiceDetails", reports.getInvoiceDetails);

    app.get(root + "/exportDayEndReports", reports.exportDayEndReports);

    app.post(root + "/getBankReports", reports.getBankReports);
    app.post(root + "/getMerchantLedgerReports", reports.getMerchantLedgerReports);

    app.post(root + "/getManualOrderReport", reports.getManualOrderReport);
    app.get(root + "/getMerchantOrderReports", reports.getMerchantOrderReports);

    //############################ Reports / ######################################################

    //############################ Integration / ##################################################

    app.post(root + "/getIntegration", integrationApi.getIntegration);
    app.post(root + "/generetKey", integrationApi.generetKey);

    integration.createIntegration(app);

    //############################ Integration / ##################################################


    //##################################### Save Manual Uploads ###################################

    app.post(root + "/saveManualOrderOnMobile", upload.any(), function(req, res) {
        var tmp_path = req.files[0].path;
        req.body.uploadimg = req.files[0].originalname;
        var target_path = 'www/mobile/mord/' + req.files[0].originalname;
        var src = fs.createReadStream(tmp_path);
        var dest = fs.createWriteStream(target_path);

        src.pipe(dest);

        fs.unlink(req.files[0].path, function(err) {
            if (err) return console.log(err);
        });

        // src.on('end', function() { status: "true" });
        src.on('end', function() {
            mnlord.saveManualOrder(req, res)
                // tripapi.saveTripStops(req, res);
                // res.send({ status: "true" });
        });
        src.on('error', function(err) {
            res.send({ error: "upload failed" });
            console.log(err);
        });
    });

    //##################################### Save Manual Uploads ###################################
}


module.exports = appRouter;