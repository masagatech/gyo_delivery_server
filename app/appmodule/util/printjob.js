var child_process = require("child_process");
var printjob = module.exports = {};

printjob.print = function print(prints_d) {
    var i = prints_d.length - 1;

    job(prints_d[i]);

    function job(data) {
        // var printer = data.prntr.toString().replace(/\\\//g, "/").split('\\');
        // var cmd = "lpr -S " + printer[2] + " -P " + printer[3] + " " + data.file;

        var cmd = "print /d:" + data.prntr + " " + data.file;
        child_process.exec(cmd, function(error, stdout, stderr) {
            console.log(stdout);
            console.log(error);
            console.log(stderr);
            i -= 1;
            if (i > -1) {
                job(prints_d[i]);
            }
            // rs.resp(res, 200, ["print done"]);
        })
    }

}