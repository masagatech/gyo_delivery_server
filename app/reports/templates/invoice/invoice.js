var Handlebars = require('handlebars');
var reports = module.exports = {};
var globals = require("gen").globals;

reports.getInvoiceReports = function getInvoiceReports(data) {
    var _hndlbar = Handlebars;

    _hndlbar.registerHelper('logourl', function(params) {
        return globals.logourl;
    });

    return _hndlbar;
}