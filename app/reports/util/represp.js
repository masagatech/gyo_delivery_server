var reprs = module.exports = {};

//mu = require('mu2'),

var util = require('util');
var pdf = require('phantom-html2pdf');
var tempFile = require('tmp');
var fs = require('fs');
var globals = require("../../globals.js");
var Handlebars = require('handlebars');
var helpers = require('./globalfun.js');

//mu.root = globals.reportTemplatePath();
var rootPath = globals.reportTemplatePath();
var reportRootPath = globals.reportRootPath();

reprs.resp = function resp(template, data, req, res, done, options,_handlebars) {
    try {
        var onlyHtml = false;
        var _pdfOptions = { 
                 format:  "A4",
                 orientation: "portrait"
            };

        var _hndlbar = _handlebars || Handlebars;  

        if(options !== undefined){   
            if( options.pdfoptions !== undefined) 
            _pdfOptions.format = options.pdfoptions.format || _pdfOptions.format;
             if( options.pdfoptions !== undefined) 
            _pdfOptions.orientation = options.pdfoptions.orientation || _pdfOptions.orientation;
            if(options.onlyHtml!== undefined){
                onlyHtml = options.onlyHtml;
            }
        }
         
        



        

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
        if(onlyHtml){
           return result; 
        }

        var tmpobj = tempFile.fileSync({ mode: 0644, prefix: 'reports-', postfix: '.html' });
        // // console.log(tmpobj.name);
        const file = fs.createWriteStream(tmpobj.name);
        //stream.pipe(file);
        file.write(result, 'utf8');
        file.end();
        console.log(reportRootPath + "\\runningfile.js");
        pdf.convert({
            "html": tmpobj.name,
            "paperSize": {
                format:  _pdfOptions.format,
                orientation: _pdfOptions.orientation,
                border: { left: '1px', top: '1px', right: '1px', bottom: '1px' },


            },
            "runnings": reportRootPath + "\\runningfile.js",
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