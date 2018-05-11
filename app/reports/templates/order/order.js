var Handlebars = require('handlebars');
var reports = module.exports = {};

reports.getOrderReports = function getOrderReports(data) {
    var _hndlbar = Handlebars;
    var params = data.params;

    _hndlbar.registerHelper('getOrderType', function(row) {
        if (params.format == "xls") {
            return row.ordtypenm;
        } else {
            return '<div class="' + row.ordtypenm + '"></div>';
        }
    });

    return _hndlbar;
}