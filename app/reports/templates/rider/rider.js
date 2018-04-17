var Handlebars = require('handlebars');
var riderReports = module.exports = {};

riderReports.monthlyOrders = function resolveTemplate(data) {
    var _hndlbar = Handlebars;
    data_header = data.data2;
    data_cols = data.data;

    if (data.data.length > 0) {
        data.city = data.data[0]['locname'];
        data.hotspot = data.data[0]['locname'];
    }

    var col_total = [];
    var date_ar = [];

    for (i = 0; i < data_header.length; i++) {
        date_ar.push(parseInt(data_header[i]['date']));
        col_total[i] = 0;
    }

    var max_date = Math.max.apply(null, date_ar);
    start = parseInt(data_header[0]['date']);

    columnorder = [];
    order = start;

    var firstset = 0,
        lastset = 0;

    for (i = 0; i < data_header.length; i++) {
        columnorder.push(order);
        order = order + 1;

        if (order == max_date + 1) {
            firstset = columnorder.length;
            order = 1;
        }
    }

    lastset = data_header.length - firstset;
    data.firstset = firstset;
    data.lastset = lastset;

    data.firstset_month = data_header[0]['month'];
    data.lastset_month = data_header[data_header.length - 1]['month'];

    _hndlbar.registerHelper('date_cols', function(row) {
        var columns = '';
        var total = 0;
        let data = '';

        for (var i = 0; i < data_header.length; i++) {
            var color = 'white';

            data = row[columnorder[i]];
            col_total[i] += data;
            total = total + data;
            columns = columns + '<td class="text-center">' + (data == null ? '-' : data) + '</td>'
        }

        columns += '<th class="text-center" >' + total + '</th>';

        return columns;
    });

    _hndlbar.registerHelper('col_total', function(params) {
        columns = '';
        sum = 0;

        for (var i = 0; i < col_total.length; i++) {
            sum += col_total[i];
            data = col_total[i];
            columns = columns + '<td class="text-center"><b>' + (data == null ? '-' : data) + '</b></td>'
        }
        columns += '<td class="text-center"><b>' + (sum == null ? '-' : sum) + '</b></td>'

        return columns;
    });

    _hndlbar.registerHelper('vtotal', function(params) {
        var total = 0;

        for (var i = 0; i <= cols.length - 1; i++) {
            var _d = params[cols[i]];

            if (typeof _d == "number") {
                total = total + parseInt(_d);
                Total[i] = Total[i] + parseInt(_d);
                Total[31] = Total[31] + parseInt(_d);
            }
        }

        return total;
    });

    _hndlbar.registerHelper('isnull', function(params) {
        if (typeof params !== "number") { params = 0; }
        return params;
    });

    _hndlbar.registerHelper('total', function() {
        var _footertotal = '';

        for (var i = 0; i <= Total.length - 1; i++) {
            _footertotal = _footertotal + '<td class="text-center bold">' + Total[i] + '</td>'
        }

        return _footertotal;
    });

    return _hndlbar;
}

riderReports.monthlyAttendence = function resolveTemplate(data) {
    var _hndlbar = Handlebars;

    data_header = data.data2;
    data_cols = data.data;

    if (data.data.length > 0) {
        data.city = data.data[0]['locname'];
        data.hotspot = data.data[0]['locname'];
    }

    var date_ar = [];

    for (i = 0; i < data_header.length; i++) {
        date_ar.push(parseInt(data_header[i]['date']));
    }

    var max_date = Math.max.apply(null, date_ar);

    start = parseInt(data_header[0]['date']);
    columnorder = [];
    order = start;

    var firstset = 0,
        lastset = 0;

    for (i = 0; i < data_header.length; i++) {
        columnorder.push(order);
        order = order + 1;

        if (order == max_date + 1) {
            firstset = columnorder.length;
            order = 1;
        }
    }

    lastset = data_header.length - firstset;
    data.firstset = firstset;
    data.lastset = lastset;

    data.firstset_month = data_header[0]['month'];
    data.lastset_month = data_header[data_header.length - 1]['month'];

    _hndlbar.registerHelper('header', function() {
        var header = ' ';

        for (var i = 0; i < data_header.length; i++) {
            header = header + '<th style="text-align:center">' + data_header[i]['date'] + '<br> ' + data_header[i]['day'] + '</td>'
        }

        return header;
    });

    _hndlbar.registerHelper('date_cols', function(row) {
        var columns = '';

        var total_present = 0,
            total_abesent = 0,
            total_leave = 0,
            total = 0;

        let data = '';

        for (var i = 0; i < data_header.length; i++) {
            var color = 'white';
            data = row[columnorder[i]];

            if (data == 'P') {
                total_present++;
                color = '#086f1f';
            }

            if (data == 'A') {
                total_abesent++;
                color = '#924545';
            }

            if (data == 'W') {
                total_leave++;
                color = '#121275';
            }

            if (data == 'P' || data == 'W') {
                total++;
            }

            columns = columns + '<td onclick="console.log(\'' + row.riderid + '\',\'' + data_header[i]['fulldate'] + '\')" class="text-center" style="color:' + color + '"><b>' + (data == null ? '-' : data) + '</b></td>'
        }

        columns += '<td class="text-center" style="color:#086f1f; "><b>' + total_present + '</b></td>';
        columns += '<td class="text-center" style="color:#924545;"><b>' + total_abesent + '</b></td>';
        columns += '<td class="text-center" style="color:#121275;"><b>' + total_leave + '</b></td>';
        columns += '<td class="text-center" style="color:black;">' + total + '</td>';

        return columns;
    });

    return _hndlbar
}

riderReports.attendence = function resolveTemplate(data) {
    var _hndlbar = Handlebars;
    data_header = data.data2;
    data_cols = data.data;

    function getTimedesc(diff) {
        diffHrs = Math.floor((diff % 86400000) / 3600000); // hours
        diffMins = Math.round(((diff % 86400000) % 3600000) / 60000); // minutes
        time_diff = "";

        if (diffHrs > 0) {
            time_diff += diffHrs + " Hr ";
        }
        if (diffMins > 0) {
            time_diff += diffMins + " Min";
        }

        return time_diff;
    }

    if (data.data.length > 0) {
        data.city = data.data[0]['locname'];
        data.hotspot = data.data[0]['locname'];
    }

    _hndlbar.registerHelper('login_details', function(row) {
        var columns = '';
        var details, dataset;
        var login_details = '';

        if (data.data.length > 0) {
            a = row['autoids'];
            b = row['cr_ar'];

            var swapped;

            do {
                swapped = false;
                for (var i = 0; i < a.length - 1; i++) {
                    if (parseInt(a[i]) > parseInt(a[i + 1])) {
                        var temp = a[i];
                        var temp2 = b[i];
                        a[i] = a[i + 1];
                        b[i] = b[i + 1];
                        a[i + 1] = temp;
                        b[i + 1] = temp2;
                        swapped = true;
                    }
                }
            }

            while (swapped);
            row['cr_ar'] = b;
            login_details = '<td>';

            var start = 0,
                end = 0;
            total_time = 0;

            for (var i = 0; i < row['cr_ar'].length; i++) {
                dataset = row['cr_ar'][i];
                details = dataset.split(",");

                if (details[1] == 'true') {
                    login_details += details[0] + "(On) - ";

                    if (i != 0) {
                        previous_dataset = row['cr_ar'][i - 1];
                        previous_details = previous_dataset.split(",");
                        if (previous_details[1] == 'false') {
                            start = details[2];
                        }
                    } else {
                        start = details[2];
                    }
                } else if (details[1] == 'false') {
                    if (i != 0) {
                        previousend_dataset = row['cr_ar'][i - 1];
                        previousend_details = previousend_dataset.split(",");
                    } else {
                        previousend_details[1] == 'true';
                    }
                    if (previousend_details[1] == 'false') {
                        time_diff = "No Start Specified";
                    } else {
                        end = details[2];
                        diff = new Date(end) - new Date(start);
                        total_time += diff;
                        time_diff = getTimedesc(diff);
                    }

                    login_details += details[0] + "(Off) - <b>" + time_diff + "</b> <br>";
                }
            }

            login_details += "<br><b> Total : " + getTimedesc(total_time) + "</b></td>";

            if (data.params.loginDetails == 'yes') {
                return "<td><b> " + getTimedesc(total_time) + "</b></td>" + login_details;
            } else {
                return "<td><b> " + getTimedesc(total_time) + "</b></td>";
            }
        }
    });

    return _hndlbar;
}