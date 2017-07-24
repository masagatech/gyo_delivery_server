
module.exports = {
    formatnumber: function(params) {
        var decimalSep = '.';
        var thousandSep = ',';
        var currSymPlace = 'p';

        return amt(params, 2, 3, thousandSep, decimalSep);

    },

     eq: function(param1,param2) {
        return param1 === param2;

    }

}

function amt(a, n, x, s, c) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
        num = parseFloat(a).toFixed(Math.max(0, ~~n));

    return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
}