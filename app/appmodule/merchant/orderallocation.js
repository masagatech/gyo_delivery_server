var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;
var notification = require("./notification")

var ordallocation = module.exports = {};

ordallocation.sendorder = function(req, res, done) {

    var userIds = req.body.uids;
    var orderdetails = req.body.orddt;
    var status = req.body.status;
    ordallocation.sendNotification({
        "userids":userIds,
        "ordid" : orderdetails.ordid,
        "flag" : "ordnotify",
         "status": status,      

    } , {
            "ordid" : orderdetails.ordid,
            "type": "ordering",
            "subtype": "neworder"
    }, 
       orderdetails
   );
    rs.resp(res, 200, "success");
}

// sending FCM notification
var fcm = require("gen").fcm();

    ordallocation.sendNotification = function(_users, _data,_data1, res) {
       db.callProcedure("select " + globals.merchant("funget_api_getnotifyids") + "($1,$2,$3::json);", ['tripnotify','tripnotify1', _users], 
       function(data) {
          

           var devicetokens = data.rows[0];
        //    var tokens = [];
        //    var users = [];
            var msg = data.rows[1][0];
            _data["body"] = msg.body;
            _data["title"] = msg.title;
            _data["extra"] = _data1;

           for(var i=0;i<=devicetokens.length -1;i++){
                // tokens.push(devicetokens[i].devtok);
                // users.push(devicetokens[i].uid);
                 _data.uid = devicetokens[i].uid;
                // console.log(_data);
                 ordallocation.sendOrderToManualNotification(_data);
                //console.log(devicetokens[i].devtok);
           }
           
            // if(res){
            //     if(_data.flag == "reaching"){
            //         if(msg.title =="al"){
            //             var _d = {
            //                 "status": false
            //             };
            //             rs.resp(res, 200, _d);
            //             return;
            //         }else{
            //              var _d = {
            //                 "status": true
            //             };
            //             rs.resp(res, 200, _d);
            //         }
                   
            //     }
            // }

        //    if(_data.flag == "stoptrip"){
        //         if(msg.title =="no"){
        //             return;
        //         }
        //     }


        //    _data["body"] = msg.body;
        //    _data["title"] = msg.title;
        //    _data["extra"] = _data1;
        // var message = {
        //                 "registration_ids": tokens,
        //                 "notification": {
        //                     "sound": "default",
        //                      "body": msg.body,
        //                     "title": msg.title,
        //                 },
        //                 "data":_data,
        //                 "priority": "HIGH",
        //                 "time_to_live": (60 * 15)
        //             };
        //         for(var i=0;i<=users.length -1;i++){
        //                 _data.uid = users[i];
        //                 ordallocation.sendOrderToManualNotification(_data);
        //         }

                // fcm.send(message, function(err, response) {

                //     if (err) {

                //         console.log("Something has gone wrong!" ,err );

                //     } else {
                //         console.log("Successfully sent with response: ", response);

                //     }
                // });

    }, function(err) {
      
    },2);

}



ordallocation.sendOrderToManualNotification= function(data)
{
    var req = {};
    req.body =data;

    notification.createNotify(req);
}

ordallocation.sendorderResp = function (){

    
}
