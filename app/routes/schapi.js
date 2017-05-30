var globals = require("gen").globals;

var tripapi = require("../appmodule/schoolapi/tripapi.js");
var tripsinfo = require("../appmodule/z_apitrips/tripsinfo.js");
var parents = require("../appmodule/schoolapi/parents.js");
var notify = require("../appmodule/schoolapi/notificationapi.js");


var appSchRouter = function(app) {
    //##################################### Pick and Drop ###############################################

    app.post(globals.globvar.rootAPI + "/tripapi", tripapi.mytrips);
    app.post(globals.globvar.rootAPI + "/tripapi/start", tripapi.starttrip);
    app.post(globals.globvar.rootAPI + "/tripapi/stop", tripapi.stoptrip);
    app.post(globals.globvar.rootAPI + "/tripapi/crews", tripapi.getcrews);
    app.post(globals.globvar.rootAPI + "/tripapi/picdropcrew", tripapi.picdrpcrew);
    app.post(globals.globvar.rootAPI + "/tripapi/storedelta", tripsinfo.createtripdetails);
    app.post(globals.globvar.rootAPI + "/tripapi/getdelta", tripsinfo.gettripdelta);
    app.post(globals.globvar.rootAPI + "/tripapi/sendreachingalert", tripapi.sendreachingalert);
    //##################################### Student ###############################################
    //##################################### Parent ###############################################
    app.post(globals.globvar.rootAPI + "/cust/getmykids", parents.mykids);
    app.post(globals.globvar.rootAPI + "/cust/activatekid", parents.activatekid);
    //##################################### FCM notification ###############################################
    app.get(globals.globvar.rootAPI + "/notify", notify.getUserNotification);
}

module.exports = appSchRouter;