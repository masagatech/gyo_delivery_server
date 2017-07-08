var conf = require("gen").conf;

var reportExpress = require("express");
var reportApp = reportExpress();
var bodyParser = require("body-parser");
reportApp.use(bodyParser.json());
reportApp.use(bodyParser.urlencoded({ extended: true }));

//##############################################################################################
reportApp.all('/*', function(req, res, next) {
    // CORS headers
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain

    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    // Set custom headers for CORS
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,App-Id,Password');
    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});
//##############################################################################################
var reportsRoutes = require("../routes/report.js")(reportApp);

//##############################################################################################

// If no route is matched by now, it must be a 404
reportApp.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
//#############################################################################################
///start API server
var reportServer = reportApp.listen(conf.reportserver.port, conf.reportserver.ip, function() {
    console.log("Listening on port for reports %s...", reportServer.address().port);
});