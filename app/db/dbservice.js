var globals = require("gen").globals;
var pg = require("pg");

var db = module.exports = {};

db.constr = globals.constr();

db.callProcedure = function callProcedure(funName, data, callback, errcallback, refcount) {

    pg.connect(db.constr, function(err, client, done) {
        //console.log("here");
        if (err) {
            done();
            errcallback(err);
            return console.error('error fetching client from pool', err);
        }
        client.query("begin;", function(err, result) {
            if (err) {
                //rs.resp(res, 401, "error in begin");
                errcallback(err);
                commit(client, done);
                return
            }
            client.query(funName, data, function(err, result) {
                if (err) {
                    // rs.resp(res, 401, "error : " + err);
                    errcallback(err);
                    commit(client, done);
                    return
                }

                var results = { "rows": [] };
                var querycount = 0;
                refcount = refcount === undefined ? 1 : refcount;
                for (var index = 0; index < refcount; index++) {
                    var element = data[index];

                    client.query('FETCH all from ' + element + ' ;', function(err, result) {
                        if (err) {
                            //  rs.resp(res, 401, "error : " + err);
                            errcallback(err);
                            commit(client, done);
                            return
                        }
                        querycount += 1;
                        //result will come here;
                        if (refcount === querycount) {
                            if (refcount === 1) {
                                callback(result);
                            } else {
                                results.rows.push(result.rows);
                                callback(results);
                            }
                            commit(client, done);
                        } else {
                            results.rows.push(result.rows);
                        }

                    });
                }

            });

        });

    });

    function commit(client, done) {
        client.query('COMMIT;', function(err, result) {
            //call `done()` to release the client back to the pool
            done();
        });
    }

}





db.callFunction = function callFunction(funName, data, callback, errcallback) {

    pg.connect(db.constr, function(err, client, done) {
        //console.log("here");
        if (err) {
            done();
            errcallback(err);
            return console.error('error fetching client from pool', err);
        }
        client.query("begin;", function(err, result) {
            if (err) {
                //rs.resp(res, 401, "error in begin");
                errcallback(err);
                commit(client, done);
                return
            }
            client.query(funName, data, function(err, result) {
                if (err) {
                    // rs.resp(res, 401, "error : " + err);
                    errcallback(err);
                    commit(client, done);
                    return
                }
                callback(result);
                commit(client, done);
            });

        });

    });

    function commit(client, done) {
        client.query('COMMIT;', function(err, result) {
            //call `done()` to release the client back to the pool
            done();
        });
    }

}