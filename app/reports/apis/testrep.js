var testreport = module.exports = {};
var rs = require("../util/represp.js");

testreport.getrep = function getrep(req, res, done) {
    rs.resp('test.html', { name: "pratik" }, req, res, done, { pdfoptions:{orientation : "landscape"}});
    // db.callFunction("select " + globals.schema("funsave_addressbook") + "($1::json);", [req.body], function(data) {
    //     rs.resp(res, 200, data.rows);
    // }, function(err) {
    //     rs.resp(res, 401, "error : " + err);
    // })
}