var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;
var socket = require("socket");
var ordallocation = require("./orderallocation.js");
var js2html =require("json-to-htmltable");
var represt = require("reportutil");




var order = module.exports = {};

order.saveOrderInfo = function saveOrderInfo(req, res, done) {
    db.callFunction("select " + globals.merchant("funsave_orderinfo") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);

        try {
         var ordid =data.rows[0].funsave_orderinfo;
         //console.log(ordid);      
            if(ordid.status){

                var orderdata = {
                    "olid":  req.body.olid ,
                    "olnm":req.body.olnm ,
                    "pcktm":req.body.picktime ,
                    "amt":req.body.amt ,
                    "ordid":ordid.ordid
                    }

                req.body["ordid"] = ordid.ordid
                
                order.sendAuto(req.body);// send auto order hook
                socket.sendOrder([req.body.olid.toString(), "all"], orderdata);
            }

            
        } catch (error) {
            console.log(error);
        }

    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}


order.sendAuto = function auto(_req)// send auto order function
{
  var req ={};
  req.body = {
      "sbflg":"auto",
      "hsid":_req.hsid,
      "orddt": {
          "olnm":_req.olnm,
          "ordid":_req.ordid,
          "pchtm":new Date(),
          "stops":_req.orddtls.length,
          "amt":_req.amtcollect,
          "pcktm": _req.picktime
        },
         "uids":"{}",
         "status":"0"
    }
    ordallocation.sendorder(req);// send order allocation function
}

// download details
order.downloadOrderDetails = function downloadOrderDetails(req, res, done) {
     db.callProcedure("select " + globals.merchant("funget_reports") + "($1,$2::json);", ['bi', req.query], function(data) {

         if(!req.query["format"]){
              rs.resp(res, 401, "format not specified!");
              return;
         }
         if(req.query["format"] == "excel"){
            style={"color":"red","border":true}  ;
            download('xls',data.rows,res);
         }else if(req.query["format"] == "pdf"){
            represt.resp('rider/monthlyorder-pdf.html', { data: data.rows }, req, res, done,{ pdfoptions:{orientation : "landscape"}});
         }
        //rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}


// order.downloadOrderDetails = function downloadOrderDetails(req, res, done) {
//     db.callFunction("with ctedates as (                        select i::date as dayofmonth from generate_series('2017-06-01',                         '2017-07-07','1 day'::interval) i),                        recs as (select ord.rdrid, count(1) as counts,To_Char(dts.dayofmonth,'DD')::int as DE,                        l.locname,r.fname as rider_name,r.workshift from                         ctedates dts                        left join mrcht.tblorder ord on ord.createdon::date = dts.dayofmonth                        inner join mrcht.tblrider r on ord.rdrid=r.rdrid						inner join ginv.location l on r.city=l.locid                        where ord.rdrid <> 0  						group by ord.rdrid,dts.dayofmonth,l.locname,r.fname,r.workshift                               )                         select rdrid,locname,rider_name,workshift,DE, counts as count from recs",[], function(data) {
//         downloadCsv(data.rows,res);
//        //  rs.resp(res, 200,data.rows);
//     }, function(err) {
//         rs.resp(res, 401, "error : " + err);
//     })    
// }

function download(filetype,data,res,style=''){
        if(filetype=="csv"){
          fields=Object.keys(data[0]);      
        //    fields= ["locname","rider_name","workshift","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"];
            var json2csv = require('json2csv');
            var result = json2csv({ data: data,fields:fields });
            res.setHeader('Content-disposition', 'attachment; filename=data.csv');
            res.set('Content-Type', 'text/csv');
        }else if(filetype=='xls'){
            result=js2html(data);
            res.setHeader('Content-disposition', 'attachment; filename=demo.xls');
            res.set('Content-Type', 'application/vnd.ms-excel');
        }
         res.status(200).send(result);      
}

//for update orders
order.updateOrderDetails = function updateOrderDetails(req, res, done) {
    db.callFunction("select " + globals.merchant("funupdate_orderdetails") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows[0].funupdate_orderdetails);
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



order.getDailyOrderDetails = function getDailyOrderDetails(req, res, done) {
    db.callProcedure("select " + globals.merchant("funget_dailyorderdetails") + "($1,$2::json);", ['bi', req.query], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}

order.getFullOrderDetails = function getFullOrderDetails(req, res, done) {
    db.callProcedure("select " + globals.merchant("funget_fullorderdetails") + "($1,$2::json);", ['bi', req.query], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}

order.getapiOrders = function getapiOrders(req, res, done) {
    db.callProcedure("select " + globals.merchant("api_funget_orderdetails") + "($1,$2::json);", ['orddet', req.query], function(data) {

        if (data.rows.length > 0 && data.rows[0].status != undefined && !data.rows[0].status) {
            data.rows = [];
        }

        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}


order.getapiOrdersCounts = function getapiOrdersCounts(req, res, done) {
    db.callProcedure("select " + globals.merchant("api_funget_ordcount") + "($1,$2::json);", ['ordcount', req.query], function(data) {

        if (data.rows.length > 0 && data.rows[0].status != undefined && !data.rows[0].status) {
            data.rows = [];
        }

        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}