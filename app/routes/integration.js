var globals = require("gen").globals;
var apiroot = globals.globvar.rootAPI + "/api/v1";
var order = require('../appmodule/merchant/order.js');

var rt = module.exports = {};

rt.createRoute = function createRoute(app) {

    app.post(apiroot + "/createorder", order.apiPreSave);
};