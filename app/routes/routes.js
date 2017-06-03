var rs = require("../appmodule/util/resp.js");
var globals = require("../globals.js");
var fs = require('fs');

var login = require("../appmodule/schoolapi/login.js");
var fileupload = require('../appmodule/schoolapi/fileupload.js');
var menu = require("../appmodule/schoolapi/menu.js");
var common = require("../appmodule/schoolapi/common.js");
var location = require("../appmodule/schoolapi/location.js");
var school = require("../appmodule/schoolapi/school.js");
var holiday = require("../appmodule/schoolapi/holiday.js");
var batch = require("../appmodule/schoolapi/batch.js");
var driver = require("../appmodule/schoolapi/driver.js");
var vehicle = require("../appmodule/schoolapi/vehicle.js");
var owner = require("../appmodule/schoolapi/owner.js");
var user = require("../appmodule/schoolapi/user.js");
var student = require("../appmodule/schoolapi/student.js");
var pickdrop = require("../appmodule/schoolapi/pickdrop.js");
var reports = require("../appmodule/schoolapi/reports.js");

var dashboard = require("../appmodule/schoolapi/dashboard.js");
var driverinfo = require("../appmodule/schoolapi/driverinfo.js");

var mrktnorder = require("../appmodule/marketing/order.js");
var mrktndb = require("../appmodule/marketing/dashboard.js");

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

    app.post(globals.globvar.rootAPI + "/getDashboard", common.getDashboard);
    app.post(globals.globvar.rootAPI + "/getMOM", common.getMOM);

    //##################################### Common ####################################################

    //##################################### Location ####################################################

    app.post(globals.globvar.rootAPI + "/saveLocationInfo", location.saveLocationInfo);
    app.post(globals.globvar.rootAPI + "/getLocationDetails", location.getLocationDetails);

    //##################################### Location ###################################################

    //##################################### School ####################################################

    app.post(globals.globvar.rootAPI + "/saveSchoolInfo", school.saveSchoolInfo);
    app.post(globals.globvar.rootAPI + "/getSchoolDetails", school.getSchoolDetails);

    //##################################### Student ###################################################

    //##################################### Holiday ####################################################

    app.post(globals.globvar.rootAPI + "/saveHoliday", holiday.saveHoliday);
    app.post(globals.globvar.rootAPI + "/getHoliday", holiday.getHoliday);

    //##################################### Holiday ###################################################

    //##################################### Batch #####################################################

    app.post(globals.globvar.rootAPI + "/saveBatchInfo", batch.saveBatchInfo);
    app.post(globals.globvar.rootAPI + "/getBatchDetails", batch.getBatchDetails);

    //##################################### Batch #####################################################

    //##################################### Driver ####################################################

    app.post(globals.globvar.rootAPI + "/saveDriverInfo", driver.saveDriverInfo);
    app.post(globals.globvar.rootAPI + "/getDriverDetails", driver.getDriverDetails);

    //##################################### Driver ####################################################

    //##################################### Vehicle ####################################################

    app.post(globals.globvar.rootAPI + "/saveVehicleInfo", vehicle.saveVehicleInfo);
    app.post(globals.globvar.rootAPI + "/getVehicleDetails", vehicle.getVehicleDetails);

    //##################################### Driver ####################################################

    //##################################### Owner #####################################################

    app.post(globals.globvar.rootAPI + "/saveOwnerInfo", owner.saveOwnerInfo);
    app.post(globals.globvar.rootAPI + "/getOwnerDetails", owner.getOwnerDetails);

    //##################################### Owner #####################################################

    //##################################### User #####################################################

    app.post(globals.globvar.rootAPI + "/saveUserInfo", user.saveUserInfo);
    app.post(globals.globvar.rootAPI + "/getUserDetails", user.getUserDetails);

    app.post(globals.globvar.rootAPI + "/saveUserRights", user.saveUserRights);
    app.post(globals.globvar.rootAPI + "/getUserRights", user.getUserRights);

    //##################################### User #####################################################

    //##################################### Student ###################################################

    app.post(globals.globvar.rootAPI + "/saveStudentInfo", student.saveStudentInfo);
    app.post(globals.globvar.rootAPI + "/getStudentDetails", student.getStudentDetails);

    //##################################### Student ###################################################

    //##################################### Pick and Drop #############################################

    app.post(globals.globvar.rootAPI + "/savePickDropInfo", pickdrop.savePickDropInfo);
    app.post(globals.globvar.rootAPI + "/getPickDropDetails", pickdrop.getPickDropDetails);

    //##################################### Pick and Drop #############################################

    //##################################### Reports ###################################################

    app.post(globals.globvar.rootAPI + "/getAttendanceReports", reports.getAttendanceReports);

    //##################################### Reports ###################################################

    //##################################### Marketing Order #####################################################

    app.post(globals.globvar.marketapi + "/saveOrderInfo", mrktnorder.saveOrderInfo);
    app.post(globals.globvar.marketapi + "/updateOrderInfo", mrktnorder.updateOrderInfo);
    app.post(globals.globvar.marketapi + "/getOrderDetail", mrktnorder.getOrderDetail);
    app.post(globals.globvar.marketapi + "/getOrder", mrktnorder.getOrder);

    //##################################### Marketing Order #####################################################

    //##################################### Marketing Dashboard #######################################

    app.post(globals.globvar.rootAPI + "/getMarketingDB", mrktndb.getMarketingDB);

    //##################################### Marketing Dashboard #######################################


    //##################################### VIVEK #####################################################



    //##################################### PRATIK ####################################################

    //##################################### Dashboard #################################################

    app.post(globals.globvar.rootAPI + "/getDashboard", dashboard.getDashboard);

    //##################################### Dashboard #################################################

    //##################################### Driver Info ###############################################

    app.post(globals.globvar.rootAPI + "/saveDriverInfo", driverinfo.saveDriverInfo);
    app.post(globals.globvar.rootAPI + "/getDriverInfoGrid", driverinfo.getDriverInfoGrid);
    app.post(globals.globvar.rootAPI + "/getDriverInfoDetails", driverinfo.getDriverInfoDetails);

    //##################################### Driver Info ################################################

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

    //##################################### PRATIK #####################################################
}

module.exports = appRouter;