var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;
const gen = require("gen");
var download = gen.download;

var orderreport = module.exports = {};

// download details

var orderreportapi = require("../../reports/apis/order.js");