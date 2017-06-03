var rs = require("gen").res;
var globals = require("gen").globals;
var redis = require('redisdb');

var notification = module.exports = {};

notification.getNotify = function getNotify(req, res1, done) {
    // db.callFunction("select " + globals.merchant("funsave_orderinfo") + "($1::json);", [req.body], function(data) {
         var keys = redis.hkeys('USER' + req.query.uid, function(err, res){
                if(err){
                    rs.resp(res1, 200, {"state":false,"error": err});
                }else{
                    var kys = res;
                    if(kys.length > 0){
                         redis.hget('USER' + req.query.uid, kys[0].toString(),
                         function(err, res){
                             try {
                                 rs.resp(res1, 200, {"state":true, data: JSON.parse(res)});  
                                 redis.hdel('USER' + req.query.uid, kys[0].toString());  
                             } catch (error) {
                                   rs.resp(res1, 200, {"state":false, "error":error});
                             }
                                
                                
                            });
                             
                    }else{
                        rs.resp(res1, 200, {"state":false, "error": "no data found"});
                    }
                }
         });

      
    // }, function(err) {
    //     rs.resp(res, 401, "error : " + err);
    // })
}


notification.createNotify = function createNotify(req, res1, done) {
            var keys = redis.hkeys('USER' + req.body.uid, function(err, res){
                    if(res.length > 20){
                        var retunval = redis.hdel('USER' + req.body.uid,res[0].toString(), function(err, res){
                              if(err){
                                    if(res1)
                                    rs.resp(res1, 200,  {"state":false,"error 1": err});
                                    return;
                                }
                          
                            var uniq = new Date().getTime();
                            redis.hmset(['USER' + req.body.uid, uniq, JSON.stringify(req.body)],function(err, res){
                                 if(err){
                                    if(res1)
                                    rs.resp(res1, 200,  {"state":false,"error 2": err});
                                    return;
                                }
                                if(res1)
                                rs.resp(res1, 200,  {"state":true,"data": res});
                            });
                        })  

                    }else{
                         var uniq = new Date().getTime();
                        redis.hmset(['USER' + req.body.uid, uniq, JSON.stringify(req.body)],function(err, res){
                                if(err){
                                    if(res1)
                                    rs.resp(res1, 200,  {"state":false,"error 3": err});
                                    return;
                                }
                                if(res1)
                                 rs.resp(res1, 200,  {"state":true,"data": res});
                        });

                    }
                   

           });
}
