var globals = require("gen").globals;

var dashboard = require("../appmodule/merchant/dashboard.js");
var hotspot = require('../appmodule/merchant/hotspot.js');
var rider = require('../appmodule/merchant/rider.js');
var merchant = require('../appmodule/merchant/merchant.js');
var outlet = require('../appmodule/merchant/outlet.js');
var order = require('../appmodule/merchant/order.js');
var mnlord = require('../appmodule/merchant/manualorder.js');
var dayend = require('../appmodule/merchant/dayend.js');
var customer = require('../appmodule/merchant/customer.js');
var bankpayment = require('../appmodule/merchant/bankpayment.js');

var orderdash = require('../appmodule/merchant/orderdashboard.js');
var mobile = require('../appmodule/merchant/mobile.js');
var ordallocation = require('../appmodule/merchant/orderallocation.js');
var status = require('../appmodule/merchant/status.js');

var notification = require('../appmodule/merchant/notification.js');
var trip = require('../appmodule/merchant/trip.js');
var reports = require('../appmodule/merchant/reports.js');

var gmap = require('../appmodule/merchant/gmap.js');

var integration = require('../routes/integration.js');
var integrationApi = require('../appmodule/integration/api.js');

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

    //#############################################################################################

    //############################ Hotspot ########################################################

    app.post(root + "/getHotspotDetails", hotspot.getHotspotDetails);
    app.post(root + "/saveHotspotInfo", hotspot.saveHotspotInfo);

    //#############################################################################################

    //############################ Rider ##########################################################

    app.post(root + "/getRiderDetails", rider.getRiderDetails);
    app.post(root + "/saveRiderInfo", rider.saveRiderInfo);
    app.post(root + "/updateRdrWkOfDtls", rider.updateRdrWkOfDtls);

    //#############################################################################################

    //############################ Merchant #######################################################

    app.post(root + "/getMerchantDetails", merchant.getMerchantDetails);
    app.post(root + "/saveMerchantInfo", merchant.saveMerchantInfo);

    //#############################################################################################
      //############################ BankPayment #######################################################

      app.post(root + "/getBankPaymentDetails", bankpayment.getBankPaymentDetails);
      app.post(root + "/saveBankPaymentInfo", bankpayment.saveBankPaymentInfo);
  
      //#############################################################################################
  

    //############################ Outlet #########################################################

    app.post(root + "/getOutletDetails", outlet.getOutletDetails);
    app.post(root + "/saveOutletInfo", outlet.saveOutletInfo);

    //#############################################################################################

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

    //#############################################################################################

    //############################ Customer / #####################################################

    app.post(root + "/getCustomerDetails", customer.getCustomerDetails);
    app.post(root + "/saveCustomerInfo", customer.saveCustomerInfo);

    //#############################################################################################

    //############################ API TEST / #####################################################

    //############################ Orders API / ###################################################

    app.get(root + "/getOrderDash", orderdash.getOrderDash);
    app.post(root + "/getOrderDash", orderdash.postOrderDash);
    app.get(root + "/getAvailRider", rider.getAvailable);
    app.post(root + "/pushOrderToRider", ordallocation.sendorder);

    //#############################################################################################

    //############################ Rider API / ####################################################

    app.get(root + "/getDashOrdDetails", orderdash.getOrderDetails);

    //#############################################################################################

    //############################ Mobile API / ###################################################

    app.get(root + "/saveLiveBeat", mobile.savelivebeat);

    //#############################################################################################

    //############################ Status / #######################################################

    app.get(root + "/getStatus", status.getStatus);
    app.post(root + "/setStatus", status.setStatus);

    //#############################################################################################

    //############################ Notify / #######################################################

    app.get(root + "/getNotify", notification.getNotify);
    app.post(root + "/createNotify", notification.createNotify);

    //#############################################################################################

    //############################ trip / #########################################################

    app.post(root + "/setTripAction", trip.setTripAction);

    //############################ gmap / #########################################################

    app.get(root + "/getgMapData", gmap.getmapData);

    //############################ Reports / ######################################################

    app.post(root + "/getDayEndReports", reports.getDayEndReports);
    app.post(root + "/getInvoiceDetails", reports.getInvoiceDetails);
    app.get(root + "/exportInvoiceDetails", reports.exportInvoiceDetails);

    //#############################################################################################

    app.post(root + "/getIntegration", integrationApi.getIntegration);
    app.post(root + "/generetKey", integrationApi.generetKey);

    integration.createIntegration(app);

    //###################################################################################################################


    //##################################### Save Manual Uploads #########################################################

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

    //##################################### File Uploads #########################################################

}

module.exports = appRouter;