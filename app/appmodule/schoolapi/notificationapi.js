var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;
var fcm = require("gen").fcm();

var notify = module.exports = {};

notify.getUserNotification = function getUserNotification(req, res, done) {
    // db.callFunction("select " + globals.schema("funsave_menuinfo") + "($1::json);", [req.body], function(data) {
    //     rs.resp(res, 200, data.rows);
    // }, function(err) {
    //     rs.resp(res, 401, "error : " + err);
    // })
    var message = {
        "registration_ids": ["dJK7BxPP9KY:APA91bHQg2wdBzYf3HCZRQNyWc2RgRU47-NOrP-WTvTdpZ5R7iyqE-5fsYMzYfTHPg4qOOI5gD-raOE-Spx5wKTSYBblt_Uv1nU9KNI_LG0C0PzcEDn2VYbWX6Mii8xUnTutchv8sfPw", "dDM_C1xCOp8:APA91bF3iH2NmsxEfEUHQ4F25OFfBBzVyqBAfU6l5bg9NbbOOIQFZrUbh65uZ-zUMWSHXRFbx5VG6nyurodBYvN-5zU9Yiha7BBv8JqpEJmqoyd3QlKMEmxdIw9L2nTHPNyzcDAv6Wih"],
        "notification": {
            "body": "Bus is arriving! Track your bus here11",
            "title": "GoYo Tracking",
            "sound": "default"
        },
        "priority": "HIGH",
        "time_to_live": 3600
    };
    rs.resp(res, 200, message);
    fcm.send(message, function(err, response) {

        if (err) {

            console.log("Something has gone wrong!");

        } else {
            console.log("Successfully sent with response: ", response);

        }
    });

}