var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;
var groupBy = require('json-groupby')


var item = module.exports = {};

item.getItemDetails = function getItemDetails(req, res, done) {
    db.callProcedure("select " + globals.menuschema("funget_itemdetails") + "($1,$2::json);", ['item', req.body], function (data) {
        if (req.body.flag === "custmenus") {
            if (req.body.sflag === undefined) {
                rs.resp(res, 200, getMenuCategories(data.rows));

            } else {
               
                rs.resp(res, 200, getMenuCategoriesSubCategory(data.rows));

            }
        } else {
            rs.resp(res, 200, data.rows);
        }
    }, function (err) {
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
    
    
    
    return groupBy(rdata,['cat','scat']);
    
    
    // var menu = [];
    // // [
    // //     {
    // //         "catnm": "beverages",
    // //         "subcats": [
    // //             {
    // //                 "subcatnm": "",
    // //                 "items": [
    // //                     {
    // //                         "nm": "test",
    // //                         "price": "temp"
    // //                     }
    // //                 ]
    // //             }
    // //         ]
    // //     }
    // // ];
    // var catnm = "%%%%%", subcatnm = "%%%%%";
    // var catArr = {}, subCatArr = {};
    // var isFirst = true;
    // for (var i = 0; i < rdata.length; i++) {
    //     var el = rdata[i];

    //     if (el.cat !== catnm || rdata.length - 1 == i) {
    //         if (i !== 0 || rdata.length === 1) {
    //             if (isFirst) { isFirst = false }
    //             else
    //                 menu.push(catArr);
    //         }
    //         if (catArr.catnm !== undefined) {
    //             sbcat();
    //         }
    //         catnm = el.cat;
    //         catArr = {
    //             "catnm": el.cat,
    //             "subcats": []
    //         };

    //         if (i === 0) {
    //             menu.push(catArr);
    //             sbcat();
    //         }

    //     } else {
    //         sbcat();
    //     }
    //     subCatArr["items"].push(el);

    // }

    // function sbcat() {
    //     if (i === 0 || (el.cat !== catnm || el.scat !== subcatnm) || rdata.length - 1 == i) {
    //         if (i !== 0 || rdata.length === 1) {
    //             menu[menu.length - 1].subcats.push(subCatArr);
    //         }

    //         subcatnm = el.scat;
    //         subCatArr = { "subcat": subcatnm, "items": [] }

    //     }
    // }




    // return menu;
}


item.saveItemInfo = function saveItemInfo(req, res, done) {
    db.callFunction("select " + globals.menuschema("funsave_iteminfo") + "($1::json);", [req.body], function (data) {
        rs.resp(res, 200, data.rows);
    }, function (err) {
        rs.resp(res, 401, "error : " + err);
    })
}

item.saveMultiItemInfo = function saveMultiItemInfo(req, callback) {
    db.callFunction("select " + globals.menuschema("funsave_multiitems") + "($1::json);", [req], function (data) {
        callback(data.rows);
    }, function (err) {
        callback("error : " + err);
    })
}