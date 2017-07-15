var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;
var socket = require("socket");
var ordallocation = require("./orderallocation.js");
var js2html =require("json-to-htmltable");

var download = require("gen").download;





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
var rider = require("../../reports/apis/rider.js");
order.downloadOrderDetails = function downloadOrderDetails(req, res, done) {
     db.callProcedure("select " + globals.merchant("funget_reports") + "($1,$2,$3,$4::json);", ['cus1','cus2','cus3', req.query], function(data) {
        //  _hndlbar=rider.resolveTemplate(false, data, res);
		
		if(req.query["flag"]=='rider_attendence_report'){
			
			download(req,res,{data:data.rows[0] ,data1:data.rows[1][0] }, {'all':'rider/riderattendence-pdf.html'},rider.monthlyOrders);
			
		}else if(req.query["flag"]=='rider_attendence_monthly_report'){
			
			download(req,res,{data:data.rows[0] ,data1:data.rows[1][0],data2:data.rows[2]}, {'all':'rider/ridermonthlyattendence-pdf.html'},rider.monthlyAttendence);
			
		}else{
			 download(req,res,{data:data.rows[0] ,data1:data.rows[1][0] }, {'all':'rider/monthlyorder-pdf.html'},rider.monthlyOrders);
		}

        
        //download(req.query["format"],data.rows,res,_hndlbar);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 3)
}



// function generate_order_report(data){
//      var temp=[];
//          var colsum=[];
//          colsum['Total']=0;
//          colsum['locname']='Total';
//          var rowsum;
//          for (var i = 0, len = data.rows.length; i < len; i++) {
//               for (var j=1,rowsum=0;j<=31; j++){
//                   if(i==0){colsum[j] =0;}
//                     rowsum+=data.rows[i][j];
//                     colsum[j]+=data.rows[i][j];
//               }
//             data.rows[i]['Total']=rowsum;
//               colsum['Total']+=rowsum;
//         }
//         data.rows.push(colsum);
//         return data.rows;
// }

order.query = function dyquery(req, res, done) {
    db.callFunction("SELECT rider_name,locname,htspnm,rider_name,MAX(CASE cr_date WHEN '2017-07-12' THEN Status END),MAX(CASE cr_date WHEN '2017-07-13' THEN Status END),  MAX(CASE cr_date WHEN '2017-07-14' THEN Status END)FROM (select rl.riderid,l.locname,hs.htspnm,r.fname || ' '  || r.lname as rider_name,rl.cr_date::text,case when sum(case when rl.onoff=true then 1 else 0 end)>=1 and sum(case when rl.onoff=false then 1 else 0 end) >=1 then 'P' else 'A' end Status from mrcht.tblrideronllog rl inner join mrcht.tblrider r on r.rdrid=rl.riderid inner join mrcht.tblhotspot hs on r.hsid=hs.htspid inner join ginv.location l on r.city=l.locid group by rl.riderid,rl.cr_date,rider_name,l.locname,hs.htspnm order by l.locname,hs.htspnm,rl.riderid,rl.cr_date) a  group by rider_name,locname,htspnm,rider_name", [req.body], function(data) {
        rs.resp(res, 200, data.rows[0]);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
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