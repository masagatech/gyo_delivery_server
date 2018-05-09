var Handlebars = require('handlebars');
var reports = module.exports = {};

reports.getMerchantLadgerReports = function getMerchantLadgerReports(data) {
    var _hndlbar = Handlebars;
    var params = data.params;

    _hndlbar.registerHelper('getOrderType', function(row) {
        if (params.format == "xls") {
            return row.ordtype;
        } else {
            return '<div class="' + row.ordtype + '"></div>';
        }
    });

    return _hndlbar;
}