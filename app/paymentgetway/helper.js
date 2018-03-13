var Handlebars = require('handlebars');
var payment = module.exports = {};
var fs = require("fs");

payment.getPaymentModule = function getPaymentModule(data, globals) {
    var _hndlbar = Handlebars;

    var rootPath = globals.getDir();
    var htmlBody = fs.readFileSync(rootPath + '/paymentgetway/paygetway.html', 'utf8');
    var template = _hndlbar.compile(htmlBody);
    var html = template(data);

    return html;
}