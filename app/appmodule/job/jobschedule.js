var schedule = require('node-schedule');
var fcm = require("gen").fcm();
var job = module.exports = {};

// Customer

job.StartJob = function() {
    //  var j = schedule.scheduleJob('15 * * * * *', function () {

    console.log('The answer to life, the universe, and everything!');

    setInterval(function() {
        var message = {
            // "message": {
            // "registration_ids": ["f-9Bo1v4gSI:APA91bEml7DnUgiIb54_jQDO4N_B6hE_sqnnjufwfw_Ie586d78M6znXeqtSftAV2R1wiEjH8Dg0lnUep2LzfuavLoDxg8BrN9_-bctB0O6u-HSPBaPg2fYqPLyFUXdibdyunVX-0D2c"],
            // "notification": {
            //     "sound": "default",
            //     "body": "msg.body",
            //     "title": "msg.title", 
            // },

            "to": "/topics/wakeup",
            "priority": "high",
            "data": {
                "aa": "bb"

            },
            "delay_while_idle": false,
            "time_to_live": 0
        };

        console.log(fcm)

        fcm.send(message, function(err, response) {
            if (err) {
                console.log("Something has gone wrong!", err);
            } else {
                console.log("Successfully sent with response: ", response);
            }
        });
    }, 1000 * 40)
}