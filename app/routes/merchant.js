var globals = require("gen").globals;

var hotspot = require('../appmodule/merchant/hotspot.js');
var rider = require('../appmodule/merchant/rider.js');
var merchant = require('../appmodule/merchant/merchant.js');
var outlet = require('../appmodule/merchant/outlet.js');
var restaurant = require('../appmodule/merchant/restaurant.js');
var category = require('../appmodule/merchant/category.js');
var items = require('../appmodule/merchant/items.js');
var order = require('../appmodule/merchant/order.js');

var common = require('../appmodule/merchant/common.js');
var orderdash = require('../appmodule/merchant/orderdashboard.js');

const root = globals.globvar.rootAPI + "/mrcht";

var appRouter = function(app) {
    //############################ API Details ####################################################

    var APIInfo = {
        ver: "1.0",
        type: "REST API",
        requestdata: "JSON",
        responsedata: "JSON",
    }

    //#############################################################################################

    //############################ VIVEK / ####################################

    //############################ Hotspot #####################################
    app.post(root + "/getHotspotDetails", hotspot.getHotspotDetails);
    app.post(root + "/saveHotspotInfo", hotspot.saveHotspotInfo);
    //#############################################################################################

    //############################ Rider #####################################
    app.post(root + "/getRiderDetails", rider.getRiderDetails);
    app.post(root + "/saveRiderInfo", rider.saveRiderInfo);
    //#############################################################################################

    //############################ Merchant #####################################
    app.post(root + "/getMerchantDetails", merchant.getMerchantDetails);
    app.post(root + "/saveMerchantInfo", merchant.saveMerchantInfo);
    //#############################################################################################

    //############################ Outlet #####################################
    app.post(root + "/getOutletDetails", outlet.getOutletDetails);
    app.post(root + "/saveOutletInfo", outlet.saveOutletInfo);
    //#############################################################################################

    //############################ Restaurant #################################
    app.post(root + "/getRestaurantMaster", restaurant.getRestaurantMaster);
    app.post(root + "/getRestaurantDetails", restaurant.getRestaurantDetails);
    app.post(root + "/saveRestaurantMaster", restaurant.saveRestaurantMaster);
    //#############################################################################################

    //############################ Category ###################################
    app.post(root + "/saveCategory", category.saveCategory);
    app.post(root + "/saveSubCategory", category.saveSubCategory);
    //#############################################################################################

    //############################ Items / ###################################
    app.post(root + "/getItems", items.getItems);
    app.post(root + "/saveItems", items.saveItems);
    //#############################################################################################

    //############################ Orders / ###################################
    app.post(root + "/saveOrderInfo", order.saveOrderInfo);
    app.post(root + "/getOrderDetails", order.getOrderDetails);
    //#############################################################################################

    //############################ Common / ###################################
    app.get(root + "/getAutoData", common.getAutoData);
    app.post(root + "/getDropDownData", common.getDropDownData);
    //#############################################################################################

    //############################ API TEST / ##########################

    //############################ Orders API / ###################################
    app.get(root + "/getOrderDash", orderdash.getOrderDash);
    app.post(root + "/getOrderDash", orderdash.postOrderDash);
}

module.exports = appRouter;