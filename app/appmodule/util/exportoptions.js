var represt = require("reportutil");

var printjob = module.exports = function download(req, res, data, template, resolveTemplate) {
    var filetype = req.query["format"];
    var filename = req.query["filename"];

    var isheader = req.query["header"] || 'yes';
    var default_template = 'default.html';

    if (!filename) {
        filename = "download"
    }

    if (!filetype) {
        res.status(200).send("format not specified!");
    } else if (filetype == "csv") {
        fields = Object.keys(data[0]);
        var json2csv = require('json2csv');
        var result = json2csv({ data: data, fields: fields });
        res.setHeader('Content-disposition', 'attachment; filename=' + filename + '.csv');
        res.set('Content-Type', 'text/csv');
        res.status(200).send(result);
    } else if (filetype == 'xls') {
        var tmpet = template.xls || template.all || default_template;
        // result = js2html(data);  
        // result = represt.resp('rider/monthlyorder-pdf.html',{ data: data},null, res,null,{onlyHtml:true });
        result = represt.resp(tmpet, data, null, res, null, { onlyHtml: true, pdfoptions: { orientation: "landscape" }, headerfooter: isheader }, resolveTemplate(data));
        res.setHeader('Content-disposition', 'attachment; filename=' + filename + '.xls');
        res.set('Content-Type', 'application/vnd.ms-excel');
        res.status(200).send(result);
    } else if (filetype == 'pdf') {
        var tmpet = template.pdf || template.all || default_template;
        represt.resp(tmpet, data, null, res, null, { onlyHtml: false, pdfoptions: { orientation: "landscape" }, headerfooter: isheader }, resolveTemplate(data));
        // represt.resp('rider/monthlyorder-pdf.html', { data: data }, null, res, null,{ pdfoptions:{orientation : "landscape"}});
    } else if (filetype == 'html') {
        var tmpet = template.html || template.all || default_template;

        result = represt.resp(tmpet, data, null, res, null, { onlyHtml: true, pdfoptions: { orientation: "landscape" }, headerfooter: isheader }, resolveTemplate(data));
        res.set('Content-Type', 'text/html');
        res.status(200).send(result);
    } else {
        res.status(200).send("Invalid File Type!");
    }
}