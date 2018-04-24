var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;
var http = require('http');
var download = require('image-downloader');

var fs = require('fs');
var request = require('request');

var common = module.exports = {};

common.downloadImage = function downloadImage(req, res, done) {
    const options = {
        url: req.query.imageUrl,
        dest: req.query.destination
    }

    download.image(options).then(({ filename, image }) => {
        rs.resp(res, 200, "success");
    }).catch((err) => {
        rs.resp(res, 401, "error : " + err);
    })
}

common.getAutoData = function getAutoData(req, res, done) {
    db.callProcedure("select " + globals.schema("funget_auto") + "($1,$2::json);", ['auto', req.query], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}

common.getDropDownData = function getDropDownData(req, res, done) {
    db.callProcedure("select " + globals.schema("funget_dropdown") + "($1,$2::json);", ['ddl', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}

// MOM

common.saveMOM = function saveMOM(req, res, done) {
    db.callFunction("select " + globals.schema("funsave_mom") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

common.getMOM = function getMOM(req, res, done) {
    db.callProcedure("select " + globals.schema("funget_mom") + "($1,$2::json);", ['mom', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}

common.saveMultiMOM = function saveMultiMOM(req, res, done) {
    db.callFunction("select " + globals.schema("funsave_mom_multiple") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}