var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var tripentry = require("../z_apitrips/tripsinfo.js");


var trip = module.exports = {};
//get my todays trips details 
trip.mytrips = function(req, res, done) {
    db.callProcedure("select " + globals.schema("funget_api_mytrips") + "($1,$2::json);", ['mytrips', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1);
}

//get trips passengers details 
trip.getcrews = function(req, res, done) {
    db.callProcedure("select " + globals.schema("funget_api_tripcrews") + "($1,$2::json);", ['tripcrews', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1);
}

//start trip api 
trip.starttrip = function(req, res, done) {
    req.body.mode = "start";
    db.callFunction("select " + globals.schema("funsave_api_startstoptrip") + "($1::json);", [req.body], function(data) {
        var _d =data.rows[0].funsave_api_startstoptrip;
         rs.resp(res, 200, _d);
        if(_d.resstatus){
            //sending start notification
            trip.sendNotification({
                            "tripid":_d.tripid,
                            "flag" : "starttrip",
                            "type": "driver_tracking",
                            "subtype": "start_trip"
                            });
            
            try {
                req.body.loc = '['+ req.body.loc +']'
                var _dtr = {
                    body: req.body
                }
                tripentry.createtripdetails(_dtr);
            } catch (error) {
                //error 
            }
                     
        }
       
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    });
}

// api for stop trip from driver device
trip.stoptrip = function(req, res, done) {
    req.body.mode = "stop";
    db.callFunction("select " + globals.schema("funsave_api_startstoptrip") + "($1::json);", [req.body], function(data) {
        var _d =data.rows[0].funsave_api_startstoptrip;
        rs.resp(res, 200, _d);
        if(_d.resstatus){
            var sendData = {"tripid":_d.tripid,"flag" : "stoptrip"};
            //sending stop notification 
            trip.sendNotification(sendData);
            //sending stop status to connected members
            tripentry.stop(sendData);
        }
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    });
}

// api for pickup / drop passenger 
trip.picdrpcrew = function(req, res, done) {
    db.callFunction("select " + globals.schema("funsave_api_pickupdropcrew") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows[0].funsave_api_pickupdropcrew);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    });
}



trip.sendreachingalert = function(req, res, done) {

    var data = req.body;
    trip.sendNotification({
                            "tripid": data.tripid, 
                            "studid": data.studid , 
                            "flag" : "reaching",
                            "type": "driver_tracking",
                            "subtype": "start_trip"
                        },res);

}


// sending FCM notification
var fcm = require("gen").fcm();

    trip.sendNotification = function(_data, res) {
       db.callProcedure("select " + globals.schema("funget_api_getnotifyids") + "($1,$2,$3::json);", ['tripnotify','tripnotify1', _data], 
       function(data) {
          

           var devicetokens = data.rows[0];
           var tokens = [];
           var msg = data.rows[1][0];
           


           for(var i=0;i<=devicetokens.length -1;i++){
                tokens.push(devicetokens[i].devtok);
           }
           
            if(res){
                if(_data.flag == "reaching"){
                    if(msg.title =="al"){
                        var _d = {
                            "status": false
                        };
                        rs.resp(res, 200, _d);
                        return;
                    }else{
                         var _d = {
                            "status": true
                        };
                        rs.resp(res, 200, _d);
                    }
                   
                }
            }

           if(_data.flag == "stoptrip"){
                if(msg.title =="no"){
                    return;
                }
            }


           _data["body"] = msg.body;
           _data["title"] = msg.title;
        var message = {
                        "registration_ids": tokens,
                        "notification": {
                            "sound": "default",
                             "body": msg.body,
                            "title": msg.title,
                        },

                        "data":_data,
                        "priority": "HIGH",
                        "time_to_live": (60 * 15)
                    };
                fcm.send(message, function(err, response) {

                    if (err) {

                        //console.log("Something has gone wrong!");

                    } else {
                        //console.log("Successfully sent with response: ", response);

                    }
                });

    }, function(err) {
      
    },2);

}
