var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;
var groupBy = require('json-groupby')

var item = module.exports = {};

// Items

item.saveItemInfo = function saveItemInfo(req, res, done) {
    db.callFunction("select " + globals.menuschema("funsave_iteminfo") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

item.saveMultiItemInfo = function saveMultiItemInfo(req, callback) {
    db.callFunction("select " + globals.menuschema("funsave_multiitems") + "($1::json);", [req], function(data) {
        callback(data.rows[0]);
    }, function(err) {
        var errdt = { funsave_multiitems: { msg: "Invalid Data Format - " + err, msgid: 401 } }
        callback(errdt);
    })
}

item.getItemDetails = function getItemDetails(req, res, done) {
    db.callProcedure("select " + globals.menuschema("funget_itemdetails") + "($1,$2::json);", ['item', req.body], function(data) {
        if (req.body.flag === "custmenus" || req.body.flag === "menus") {
            if (req.body.sflag === undefined) {
                rs.resp(res, 200, getMenuCategories(data.rows));
            } else {
                rs.resp(res, 200, getMenuCategoriesSubCategory(data.rows));
            }
        } else {
            rs.resp(res, 200, data.rows);
        }
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}

function getMenuCategories(rdata) {
    var menu = {};

    for (let i = 0; i < rdata.length; i++) {
        var el = rdata[i];
        if (menu[el.cat] === undefined) {
            menu[el.cat] = [];
        }
        menu[el.cat].push(el);
    }

    return menu;
}

function getMenuCategoriesSubCategory(rdata) {
    return groupBy(rdata, ['cat', 'scat']);
}

// Addon

item.saveAddonInfo = function saveAddonInfo(req, res, done) {
    db.callFunction("select " + globals.menuschema("funsave_addoninfo") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

item.getAddonDetails = function getAddonDetails(req, res, done) {
    db.callProcedure("select " + globals.menuschema("funget_addondetails") + "($1,$2::json);", ['addon', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}