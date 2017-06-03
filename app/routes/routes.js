var rs = require("../appmodule/util/resp.js");
var globals = require("../globals.js");
var fs = require('fs');

var login = require("../appmodule/schoolapi/login.js");
var fileupload = require('../appmodule/schoolapi/fileupload.js');
var menu = require("../appmodule/schoolapi/menu.js");
var common = require("../appmodule/schoolapi/common.js");
var location = require("../appmodule/schoolapi/location.js");
var vehicle = require("../appmodule/schoolapi/vehicle.js");
var user = require("../appmodule/schoolapi/user.js");

var multer = require('multer');

var upload = multer({
    limits: {
        fieldNameSize: 999999999,
        fieldSize: 999999999
    },
    dest: 'www/uploads/'
});

var appRouter = function(app) {
    //##################################### API Details / #############################################

    var APIInfo = {
        ver: "1.0",
        type: "REST API",
        requestdata: "JSON",
        responsedata: "JSON",
    }

    app.post(globals.globvar.rootAPI + "/", function(req, res, done) {
        console.log(req.body)
        rs.resp(res, 200, APIInfo);
    });

    //##################################### API Details / #############################################


    //##################################### VIVEK #####################################################

    //##################################### Login ####################################################

    app.post(globals.globvar.rootAPI + "/getLogin", login.getLogin);
    app.post(globals.globvar.rootAPI + "/getLogout", login.getLogout);
    app.post(globals.globvar.rootAPI + "/savePassword", login.savePassword);

    //##################################### Login ####################################################

    //##################################### File Upload ####################################################

    app.post(globals.globvar.rootAPI + "/uploads", fileupload.uploadFile);
    // app.get(globals.globvar.rootAPI + "/getFilePath", fileupload.getFilePath);

    //##################################### File Upload ####################################################

    //##################################### Menu ####################################################

    app.post(globals.globvar.rootAPI + "/getMenuDetails", menu.getMenuDetails);

    //##################################### Menu ####################################################

    //##################################### Common ####################################################

    app.get(globals.globvar.rootAPI + "/getAutoData", common.getAutoData);
    app.post(globals.globvar.rootAPI + "/getDropDownData", common.getDropDownData);

    app.post(globals.globvar.rootAPI + "/getMOM", common.getMOM);

    //##################################### Common ####################################################

    //##################################### Location ####################################################

    app.post(globals.globvar.rootAPI + "/saveLocationInfo", location.saveLocationInfo);
    app.post(globals.globvar.rootAPI + "/getLocationDetails", location.getLocationDetails);

    //##################################### Location ###################################################

    //##################################### Vehicle ####################################################

    app.post(globals.globvar.rootAPI + "/saveVehicleInfo", vehicle.saveVehicleInfo);
    app.post(globals.globvar.rootAPI + "/getVehicleDetails", vehicle.getVehicleDetails);

    //##################################### User #####################################################

    app.post(globals.globvar.rootAPI + "/saveUserInfo", user.saveUserInfo);
    app.post(globals.globvar.rootAPI + "/getUserDetails", user.getUserDetails);

    app.post(globals.globvar.rootAPI + "/saveUserRights", user.saveUserRights);
    app.post(globals.globvar.rootAPI + "/getUserRights", user.getUserRights);

    //##################################### User #####################################################

    //##################################### File Uploads ###############################################

    app.post(globals.globvar.rootAPI + "/uploads", upload.any(), function(req, res) {
        var tmp_path = req.files[0].path;
        var target_path = 'www/uploads/' + req.files[0].originalname;
        var src = fs.createReadStream(tmp_path);
        var dest = fs.createWriteStream(target_path);

        src.pipe(dest);

        fs.unlink(req.files[0].path, function(err) {
            if (err) return console.log(err);
        });

        src.on('end', function() { rs.resp(res, 200, req.body.id); });
        src.on('error', function(err) { res.send({ error: "upload failed" }); });
    });

    //##################################### File Uploads ###############################################

    //##################################### VIVEK ######################################################
}

module.exports = appRouter;