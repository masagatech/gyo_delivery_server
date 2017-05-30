var globals = require("gen").globals;

var rider = require('../appmodule/merchant/rider.js');
var outlet = require('../appmodule/merchant/outlet.js');
var restaurant = require('../appmodule/merchant/restaurant.js');
var category = require('../appmodule/merchant/category.js');
var items = require('../appmodule/merchant/items.js');
var order = require('../appmodule/merchant/order.js');

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

    //############################ Rider #####################################
    app.post(root + "/getRiderDetails", rider.getRiderDetails);
    app.post(root + "/saveRiderInfo", rider.saveRiderInfo);
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

    //############################ API TEST / ##########################
}

module.exports = appRouter;