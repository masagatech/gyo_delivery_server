var db = require("db");
var rs = require("gen").res;
var express = require('express');
var path = require('path');
var formidable = require('formidable');
var fileupload = module.exports = {};

fileupload.uploadFile = function uploadFile(req, res, done) {
    var form = new formidable.IncomingForm();
    form.uploadDir = "www/uploads"; //set upload directory
    form.keepExtensions = true; //keep file extension
    
    var files = [];
    var fields = [];

    form.on('field', function(field, value) {
        fields.push([field, value]);
    })

    form.on('file', function(field, file) {
        files.push([field, file]);
    })
    
    form.on('end', function() {
        res.writeHead(200, { 'content-type': 'text/plain' });
        var sortedFiles = [];

        for(var i = 0; i <= files.length -1; i++) {
            var upl =  files[i][1];    
            
            sortedFiles.push({
                "name":upl.name,
                "type": upl.type,
                "size":upl.size,
                "path":upl.path
            });
        }

        res.write(JSON.stringify(sortedFiles));
        res.end();
    });

    form.parse(req);
}

