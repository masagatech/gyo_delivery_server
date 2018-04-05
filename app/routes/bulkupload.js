var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var xlstojson = require("xls-to-json-lc");
var xlsxtojson = require("xlsx-to-json-lc");
var globals = require("../globals.js");
var rs = require("../appmodule/util/resp.js");
var fs = require('fs');

var items = require("../appmodule/menuapi/items.js");
var bankpayment = require('../appmodule/merchant/bankpayment.js');

var root = globals.globvar.rootAPI + "/menu";

var multer = require('multer');

var upload = multer({
    limits: {
        fieldNameSize: 999999999,
        fieldSize: 999999999
    },
    dest: 'www/uploads/'
});

var appRouter = function(app) {
    app.use(bodyParser.json());

    /** API path that will upload the files */

    // Item Upload

    app.post(root + '/uploadMultiItems', upload.any(), function(req, res) {
        var exceltojson; // Initialization

        var tmp_path = req.files[0].path;
        var target_path = 'www/exceluploads/' + req.files[0].originalname;
        var src = fs.createReadStream(tmp_path);
        var dest = fs.createWriteStream(target_path);

        src.pipe(dest);

        fs.unlink(req.files[0].path, function(err) {
            if (err) return console.log(err);
        });

        if (target_path.split('.')[target_path.split('.').length - 1] === 'xlsx') {
            exceltojson = xlsxtojson;
        } else {
            exceltojson = xlstojson;
        }

        src.on('end', function() {
            try {
                xlsxtojson({
                    input: target_path, //the same path where we uploaded our file
                    output: null, //since we don't need output.json
                    lowerCaseHeaders: true
                }, function(err, result) {
                    if (err) {
                        res.json({ error_code: 1, err_desc: err, data: null });
                    } else {

                    }

                    var dataparam = { "olid": req.body.olid, "multiitems": result };

                    items.saveMultiItemInfo(dataparam, function(d) {
                        res.json({ data: d });
                    });
                });
            } catch (e) {
                res.json({ error_code: 1, err_desc: "Corupted excel file" });
            }
        });

        src.on('error', function(err) { res.send({ error: "upload failed" }); });
    });

    // Bank Payment Upload

    app.post(root + '/uploadCSVFile', upload.any(), function(req, res) {
        var exceltojson; // Initialization

        var tmp_path = req.files[0].path;
        var target_path = 'www/exceluploads/' + req.files[0].originalname;
        var src = fs.createReadStream(tmp_path);
        var dest = fs.createWriteStream(target_path);

        src.pipe(dest);

        fs.unlink(req.files[0].path, function(err) {
            if (err) return console.log(err);
        });

        if (target_path.split('.')[target_path.split('.').length - 1] === 'xlsx') {
            exceltojson = xlsxtojson;
        } else {
            exceltojson = xlstojson;
        }

        src.on('end', function() {
            try {
                xlsxtojson({
                    input: target_path, // the same path where we uploaded our file
                    output: null, // since we don't need output.json
                    lowerCaseHeaders: true
                }, function(err, result) {
                    console.log(result);

                    if (err) {
                        res.json({ error_code: 1, err_desc: err, data: null });
                    } else {

                    }

                    if (req.body.module === "bankpayment") {
                        bankpayment.bankpaymentbulkUpload({ "params": req.body, "data": result }, function(d) {
                            res.json({ data: d });
                        });
                    }
                });
            } catch (e) {
                res.json({ error_code: 1, err_desc: "Corupted excel file" });
            }
        });

        src.on('error', function(err) { res.send({ error: "upload failed" }); });
    });
}

module.exports = appRouter;