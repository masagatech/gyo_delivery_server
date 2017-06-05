var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;
var socket = require("socket");

var order = module.exports = {};

order.saveOrderInfo = function saveOrderInfo(req, res, done) {
    db.callFunction("select " + globals.merchant("funsave_orderinfo") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
        
        var ordid =data.rows[0].ordid; 
        try {
         var orderdata = {
             "olid":  req.body.olid ,
             "olnm":req.body.deldate ,
             "pcktm":req.body.picktime ,
             "amt":req.body.amt ,
             "ordid":req.body.ordid 
            }

        socket.io.sockets.in(req.body.olid).emit('msgd', { "evt": "data", "data": orderdata });
        socket.io.sockets.in('all').emit('msgd', { "evt": "data", "data": orderdata });   
        } catch (error) {
            console.log(error);
        }

    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

order.getOrderDetails = function getOrderDetails(req, res, done) {
    db.callProcedure("select " + globals.merchant("funget_orderdetails") + "($1,$2::json);", ['bi', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}


order.getapiOrders = function getapiOrders(req, res, done) {
    db.callProcedure("select " + globals.merchant("api_funget_orderdetails") + "($1,$2::json);", ['orddet', req.query], function(data) {
        
        if(data.rows.length > 0 && data.rows[0].status != undefined && !data.rows[0].status){
            data.rows = [];
        }

        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}