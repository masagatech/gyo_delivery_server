var globals = require("gen").globals;

var user = require("../appmodule/merchant/user.js");
var login = require("../appmodule/merchant/login.js");
var menu = require("../appmodule/merchant/menu.js");
var rider = require('../appmodule/merchant/rider.js');
var outlet = require('../appmodule/merchant/outlet.js');
var restaurant = require('../appmodule/merchant/restaurant.js');
var category = require('../appmodule/merchant/category.js');
var items = require('../appmodule/merchant/items.js');
var order = require('../appmodule/merchant/order.js');
var fileupload = require('../appmodule/merchant/fileupload.js');

var multer = require('multer');

var upload = multer({
    limits: {
        fieldNameSize: 999999999,
        fieldSize: 999999999
    },
    dest: 'www/uploads/'
});

const root = globals.globvar.rootAPI + "/mrcht";

var appRouter = function(app) {
    //############################ API Details ####################################################

    var APIInfo = {
        ver: "1.0",
        type: "REST API",
        requestdata: "JSON",
        responsedata: "JSON",
    }

    //#############################################################################################

    //############################ VIVEK / ########################################################

    //##################################### User ##################################################

    app.post(root + "/saveUserInfo", user.saveUserInfo);
    app.post(root + "/getUserDetails", user.getUserDetails);

    app.post(root + "/saveUserRights", user.saveUserRights);
    app.post(root + "/getUserRights", user.getUserRights);

    //##################################### User ##################################################

    //##################################### Login #################################################

    app.post(root + "/getLogin", login.getLogin);
    app.post(root + "/getLogout", login.getLogout);
    app.post(root + "/savePassword", login.savePassword);

    //##################################### Login #################################################

    //##################################### Menu ##################################################

    app.post(root + "/getMenuDetails", menu.getMenuDetails);

    //##################################### Menu ##################################################

    //############################ Rider ##########################################################
    app.post(root + "/getRiderDetails", rider.getRiderDetails);
    app.post(root + "/saveRiderInfo", rider.saveRiderInfo);
    //#############################################################################################

    //############################ Outlet #########################################################
    app.post(root + "/getOutletDetails", outlet.getOutletDetails);
    app.post(root + "/saveOutletInfo", outlet.saveOutletInfo);
    //#############################################################################################

    //############################ Restaurant #####################################################
    app.post(root + "/getRestaurantMaster", restaurant.getRestaurantMaster);
    app.post(root + "/getRestaurantDetails", restaurant.getRestaurantDetails);
    app.post(root + "/saveRestaurantMaster", restaurant.saveRestaurantMaster);
    //#############################################################################################

    //############################ Category #######################################################
    app.post(root + "/saveCategory", category.saveCategory);
    app.post(root + "/saveSubCategory", category.saveSubCategory);
    //#############################################################################################

    //############################ Items / ########################################################
    app.post(root + "/getItems", items.getItems);
    app.post(root + "/saveItems", items.saveItems);
    //#############################################################################################

    //############################ Orders / #######################################################
    app.post(root + "/saveOrderInfo", order.saveOrderInfo);
    app.post(root + "/getOrderDetails", order.getOrderDetails);
    //#############################################################################################

    //##################################### File Uploads ##########################################
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
    //##################################### File Uploads ##########################################

    //##################################### API TEST / ############################################
}

module.exports = appRouter;