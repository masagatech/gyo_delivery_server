var globals = require("gen").globals;
var apiroot = globals.globvar.rootAPI + "/api/v1";
var order = require('../appmodule/merchant/order.js');

var rt = module.exports = {};

rt.createIntegration = function createIntegration(app) {
    
    app.post(apiroot + "/order/create", order.apiPreSave);
    app.post(apiroot + "/order/cancel", order.apiPreCancel);
    app.post(apiroot + "/order/status", order.apiPreStatus);
    

};

