var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var item = module.exports = {};

item.getItemDetails = function getItemDetails(req, res, done) {
    db.callProcedure("select " + globals.menuschema("funget_itemdetails") + "($1,$2::json);", ['item', req.body], function(data) {
        if (req.body.flag === "custmenus") {

            rs.resp(res, 200, getMenuCategories(data.rows));
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


item.saveItemInfo = function saveItemInfo(req, res, done) {
    db.callFunction("select " + globals.menuschema("funsave_iteminfo") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

item.saveMultiItemInfo = function saveMultiItemInfo(req, res, done) {
    db.callFunction("select " + globals.menuschema("funsave_multiitems") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}