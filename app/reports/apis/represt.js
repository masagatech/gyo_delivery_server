var reprs = module.exports = {};

//mu = require('mu2'),

var util = require('util');
var pdf = require('phantom-html2pdf');
var tempFile = require('tmp');
var fs = require('fs');
var globals = require("../../../globals.js");
var Handlebars = require('handlebars');
var helpers = require('./globalfun.js');

//mu.root = globals.reportTemplatePath();
var rootPath = globals.reportTemplatePath();
var reportRootPath = globals.reportRootPath();


// reprs.resp = function resp(template, data, req, res, done) {
//     try {
//         var stream = mu.compileAndRender(template, data);

//         var tmpobj = tempFile.fileSync({ mode: 0644, prefix: 'reports-', postfix: '.html' });
//         // console.log(tmpobj.name);
//         const file = fs.createWriteStream(tmpobj.name);
//         stream.pipe(file);

//         pdf.convert({
//             "html": tmpobj.name,
//             "paperSize": { format: 'A4', orientation: 'portrait', border: '1cm' },
//             "deleteOnAction": true
//         }, function(err, result) {
//             /* Using a buffer and callback */
//             //result.toBuffer(function(returnedBuffer) {});
//             /* Using a readable stream */
//             var stream = result.toStream();
//             /* Using the temp file path */
//             //var tmpPath = result.getTmpPath();
//             stream.pipe(res);

//             /* Using the file writer and callback */
//             //  result.toFile("/path/to/file.pdf", function() {});
//         });

//     } catch (error) {
//         console.log(error)

//     }
// }

reprs.resp = function resp(template, data, req, res, done, _handlebars, _pdfoptions) {

    try {
        var _hndlbar = _handlebars || Handlebars;

        var options = { encoding: 'utf8' };

        var htmlBody = fs.readFileSync(rootPath + '\\' + template, 'utf8');
        var htmlHeader = fs.readFileSync(rootPath + '\\partials\\' + 'header.html', 'utf8');
        var htmlFooter = fs.readFileSync(rootPath + '\\partials\\' + 'footer.html', 'utf8');
        _hndlbar.registerPartial('rptheader', htmlHeader);
        _hndlbar.registerPartial('rptfooter', htmlFooter);
        _hndlbar.registerHelper('formatnumber', helpers.formatnumber);

        // var stream = mu.compileAndRender(template, data);
        var template = _hndlbar.compile(htmlBody);
        var result = template(data);

        var tmpobj = tempFile.fileSync({ mode: 0644, prefix: 'reports-', postfix: '.html' });
        // // console.log(tmpobj.name);
        const file = fs.createWriteStream(tmpobj.name);
        //stream.pipe(file);
        file.write(result, 'utf8');
        file.end();
        console.log(reportRootPath + "\\util\\runningfile.js");
        pdf.convert({
            "html": tmpobj.name,
            "paperSize": {
                format: 'A4',
                orientation: 'portrait',
                border: { left: '1px', top: '1px', right: '1px', bottom: '1px' },


            },
            "runnings": reportRootPath + "\\util\\runningfile.js",
            "deleteOnAction": true
        }, function(err, result) {
            /* Using a buffer and callback */
            //result.toBuffer(function(returnedBuffer) {});
            /* Using a readable stream */
            var stream = result.toStream();
            /* Using the temp file path */
            //var tmpPath = result.getTmpPath();
            stream.pipe(res);

            /* Using the file writer and callback */
            //  result.toFile("/path/to/file.pdf", function() {});
        });

    } catch (error) {
        //console.log(error)
        res.status(401);
        res.end("Error : " + error);
    }



}