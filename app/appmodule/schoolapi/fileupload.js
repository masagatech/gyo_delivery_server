var db = require("db");
var rs = require("gen").res;
var express = require('express');
var path = require('path');
var formidable = require('formidable');
var fileupload = module.exports = {};
// Include the node file module
var Jimp = require("jimp");
// Include ImageMagick

fileupload.uploadFile = function uploadFile(req, res, done) {
    let width = req.query.width || 'noresize';
    var form = new formidable.IncomingForm();

    form.uploadDir = "www/uploads"; //set upload directory
    form.keepExtensions = true; //keep file extension

    var files = [];
    var fields = [];

    form.on('field', function(field, value) {
        fields.push([field, value]);
    })

    form.on('file', function(field, file) {
        if (width !== 'noresize') {
            Jimp.read(file.path, function(err, lenna) {
                if (err) throw err;
                lenna.resize(Number(width), Jimp.AUTO) // resize 
                    .quality(80) // set greyscale 
                    .write(file.path); // save 
            });
        }
        files.push([field, file]);
    })

    form.on('end', function() {
        res.writeHead(200, { 'content-type': 'text/plain' });
        var sortedFiles = [];
        for (var i = 0; i <= files.length - 1; i++) {
            var upl = files[i][1];

            sortedFiles.push({
                "name": upl.name,
                "type": upl.type,
                "size": upl.size,
                "path": upl.path
            });
        }

        res.write(JSON.stringify(sortedFiles));
        res.end();
    });

    form.parse(req);
}