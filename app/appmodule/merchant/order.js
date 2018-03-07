'strict'

var db = require("db");
const gen = require("gen");

var rs = gen.res;

var globals = gen.globals;

var socket = require("socket");
var ordallocation = require("./orderallocation.js");
var js2html = require("json-to-htmltable");

var download = gen.download;
const encr = gen.encr;
var order = module.exports = {};

//api functions start

function responseData(_status, _code, _msg, _ordid, res) {
    var data = {
        status: _status,
        ord_id: _ordid,
        msg: _msg,
        error_code: _code
    }

    rs.resp_api(res, data);
}

order.validate = function(req, res, done) {
    var _data = req.body;

    var olid = _data.ol_id,
        prcd = (_data.partner_code || '').toString().trim(),
        tok = _data.token || req.headers['x-access-token'] || '';

    var decrypt_token = "";

    var resdata = {
        status: true,
        olnm: "",
        hsid: 0,
        areaid: 0,
        area_name: "",
        ctid: 0,
        ctname: "",
        stid: 0,
        stname: "",
        intpartcode: "",
        ucode: "",
        olid: olid
    }

    // Validation

    if (tok.trim() === "") {
        resdata.status = false;
        responseData(false, "er-021", "'token' is required!", 0, res);
        return;
    }

    if (isNaN(olid) || olid <= 0) {
        resdata.status = false;
        responseData(false, "er-021", "'olid' is required or invalid!", 0, res);
        return;
    }

    if (prcd.trim() === "") {
        resdata.status = false;
        responseData(false, "er-021", "'partner_code' is required!", 0, res);
        return;
    }

    try {
        decrypt_token = encr.decrypt(tok)
        var splittok = decrypt_token.split('$');

        // Validate Token

        if (parseInt(splittok[0]) !== parseInt(olid)) {
            resdata.status = false;
            responseData(false, "er-023", "Invalid 'token'!", 0, res);
            return;
        }

        resdata.olnm = splittok[1];
        resdata.hsid = splittok[2];
        resdata.areaid = splittok[3];
        resdata.area_name = splittok[4];
        resdata.ctid = splittok[5];
        resdata.ctname = splittok[6];
        resdata.stid = splittok[7];
        resdata.stname = splittok[8];
        resdata.intpartcode = splittok[9];
        resdata.ucode = splittok[10];
    } catch (error) {
        resdata.status = false;
        responseData(false, "er-022", "Invalid 'token'!", 0, res);
        return;
    }

    if (prcd.trim() !== resdata.intpartcode) {
        resdata.status = false;
        responseData(false, "er-021", "'partner_code' is invalid!", 0, res);
        return;
    }

    return resdata;
}

order.apiPreSave = function(req, res, done) {
    var _data = req.body;
    let _ol_data = order.validate(req, res, done);
    if (!_ol_data.status) return;

    let ordno = (_data.ord_no || '').toString().trim(),
        cust_mob = (_data.cust_mob || '').toString().trim(),
        cust_name = (_data.cust_name || '').toString().trim(),
        cust_addr = (_data.cust_addr || '').toString().trim(),
        ordamt = (_data.ordamt || '').toString().trim(),
        colamt = (_data.collect_amt || '').toString().trim(),
        remark = _data.remark || '';

    if (ordno.trim() === "" || isNaN(ordno)) { responseData(false, "er-021", "'ord_no' is required or invalid!", 0, res); return; }
    if (cust_mob.trim() === "" || cust_mob.length !== 10 || isNaN(cust_mob)) { responseData(false, "er-021", "'cust_mob' is required or invalid!", 0, res); return; }
    if (cust_name.trim() === "") { responseData(false, "er-021", "'cust_name' is required!", 0, res); return; }
    if (cust_addr.trim() === "") { responseData(false, "er-021", "'cust_addr' is required!", 0, res); return; }
    if (ordamt.trim() === "" || isNaN(ordamt)) { responseData(false, "er-021", "'ordamt' is required or invalid!", 0, res); return; }
    if (colamt.trim() === "" || isNaN(colamt)) { responseData(false, "er-021", "'collect_amt' is required or invalid!", 0, res); return; }

    var _orddtlsDT = {
        "orddid": 0,
        "ordno": ordno,
        "custid": 0,
        "custname": cust_name,
        "custmobile": cust_mob,
        "appdist": "0",
        "apptime": "0",
        "address": cust_addr,
        "geoloc": "0,0",
        "olid": _ol_data.olid,
        "amt": ordamt,
        "amtcollect": colamt,
        "remark": "",
        "cuid": _ol_data.ucode
    }

    var _custdtlsDT = {
        "custid": 0,
        "custname": cust_name,
        "custmobile": cust_mob,
        "appdist": "0",
        "apptime": "0",
        "address": cust_addr,
        "geoloc": "0,0",
        "olid": _ol_data.olid,
        "cuid": _ol_data.ucode
    }

    var saveord = {
        "ordid": 0,
        "olid": _ol_data.olid,
        "olnm": _ol_data.olnm,
        "hsid": _ol_data.hsid,
        "arid": _ol_data.areaid,
        "arname": _ol_data.area_name,
        "ctid": _ol_data.ctid,
        "ctname": _ol_data.ctname,
        "stid": _ol_data.stid,
        "appdist": 0,
        "apptime": 0,
        "stname": _ol_data.stname,
        "orddtls": [_orddtlsDT],
        "custdtls": [_custdtlsDT],
        "cuid": _ol_data.ucode,
        "amt": ordamt,
        "amtcollect": colamt,
        "ordno": [ordno],
        "isactive": true,
        "mode": "",
        "src": "api"
    }

    order.saveOrderInfo_post({ body: saveord }, false, null, function(_d) {
        responseData(_d.status, _d.code, _d.msg, _d.ordid, res);
    })
}

// cancel order api funtion

order.apiPreCancel = function(req, res, done) {
    let _data = req.body;
    let _ol_data = order.validate(req, res, done);

    if (!_ol_data.status) return;

    let ordid = _data.ord_id || '0',
        reason = _data.reason || '',
        remark = _data.remark || '';

    if (ordid.trim() === "" || isNaN(ordid) || ordid === 0) { responseData(false, "er-021", "valid 'ord_id' is required!", 0, res); return; }
    if (reason.trim() === "") { responseData(false, "er-021", "valid 'reason' is required!", 0, res); return; }

    let _dparams = {
        "flag": "cancel",
        "ordid": ordid,
        "reason": reason,
        "cuid": _ol_data.ucode
    };

    order.CancelOrder(_dparams, function(err, data) {
        if (err != null) {
            rs.resp_api(res, {
                "status": false,
                "msg": err.message,
                "error_code": "CNCL008"
            });
        }

        let _respData = data;

        rs.resp_api(res, {
            "status": _respData.status,
            "msg": _respData.msg,
            "error_code": _respData.errcd
        });
    });
}

// cancel order api funtion

order.apiPreStatus = function(req, res, done) {
    let _data = req.body;
    let _ol_data = order.validate(req, res, done);

    if (!_ol_data.status) return;

    let ordid = _data.ord_id || '0';

    if (ordid.trim() === "" || isNaN(ordid) || ordid === 0) { responseData(false, "er-021", "valid 'ord_id' is required!", 0, res); return; }

    let _dparams = {
        "flag": "api_status",
        "ordid": ordid,
        "olid": _ol_data.olid,
        "uid": _ol_data.ucode
    };

    order.getOrderStatus(_dparams, function(err, data) {
        if (err != null) {
            rs.resp_api(res, {
                "status": false,
                "msg": err.message,
                "error_code": "STS008"
            });
        }

        let _respData = data[0];

        rs.resp_api(res, {
            "status": data.length > 0 ? true : false,
            "msg": data.length > 0 ? "" : "No Data found!",
            "error_code": data.length > 0 ? "" : "STS009",
            "data": _respData
        });
    });
}

// api functions end

// nomral order info

order.saveOrderInfo = function saveOrderInfo(req, res, done) {
    order.saveOrderInfo_post(req, res, done, false)
}

order.saveOrderInfo_post = function saveOrderInfo(req, res, done, api_callback) {
    db.callFunction("select " + globals.merchant("funsave_orderinfo") + "($1::json);", [req.body], function(data) {
        if (res) {
            rs.resp(res, 200, data.rows);
        } else {
            try {
                var ordresponse = data.rows[0].funsave_orderinfo;

                if (api_callback) {
                    api_callback({
                        status: ordresponse.status,
                        code: "",
                        msg: ordresponse.msg,
                        ordid: ordresponse.ordid
                    })
                }

                if (ordresponse.status) {
                    var orderdata = {
                        "olid": req.body.olid,
                        "olnm": req.body.olnm,
                        "pcktm": req.body.picktime,
                        "amt": req.body.amt,
                        "ordid": ordresponse.ordid
                    }

                    req.body["ordid"] = ordresponse.ordid
                    order.sendAuto(req.body);

                    socket.io.sockets.in(room).emit('ordmsg', { "evt": "data", "data": data });
                }
            } catch (error) {
                console.log(error);
                if (res) rs.resp(res, 401, "error : " + err);
                if (api_callback) {
                    api_callback({
                        status: false,
                        code: "er-023",
                        msg: error.message,
                        ordid: 0
                    })
                }
            }
        }
    }, function(err) {
        if (res) rs.resp(res, 401, "error : " + err);
        if (api_callback) {
            api_callback({
                status: false,
                code: "er-024",
                msg: err.message,
                ordid: 0
            })
        }
    })
}

order.sendAuto = function auto(_req) {
    var req = {};

    req.body = {
        "sbflg": "auto",
        "hsid": _req.hsid,
        "orddt": {
            "olnm": _req.olnm,
            "ordid": _req.ordid,
            "pchtm": new Date(),
            "stops": _req.orddtls.length,
            "amt": _req.amtcollect,
            "pcktm": _req.picktime
        },
        "uids": "{}",
        "status": "0"
    }
    ordallocation.sendorder(req); // send order allocation function
}

// download details

var rider = require("../../reports/apis/rider.js");

order.downloadOrderDetails = function downloadOrderDetails(req, res, done) {
    try {
        db.callProcedure("select " + globals.merchant("funget_reports") + "($1,$2,$3,$4::json);", ['cus1', 'cus2', 'cus3', req.query], function(data) {
            //  _hndlbar=rider.resolveTemplate(false, data, res);		
            if (req.query["flag"] == 'rider_attendence_report') {
                download(req, res, { data: data.rows[0], data1: data.rows[1][0], params: req.query }, { 'all': 'rider/riderattendence-pdf.html' }, rider.attendence);
            } else if (req.query["flag"] == 'rider_attendence_monthly_report') {
                download(req, res, { data: data.rows[0], data1: data.rows[1][0], data2: data.rows[2], params: req.query }, { 'all': 'rider/ridermonthlyattendence-pdf.html' }, rider.monthlyAttendence);
            } else if (req.query["flag"] == 'rider_order_report') {
                download(req, res, { data: data.rows[0], data1: data.rows[1][0], data2: data.rows[2], params: req.query }, { 'all': 'rider/monthlyorder-pdf.html' }, rider.monthlyOrders);
            }
            //download(req.query["format"],data.rows,res,_hndlbar);
        }, function(err) {
            rs.resp(res, 401, "error : " + err);
        }, 3)

    } catch (error) {
        console.log(error);
    }
}

order.query = function dyquery(req, res, done) {
    db.callFunction("SELECT rider_name,locname,htspnm,rider_name,MAX(CASE cr_date WHEN '2017-07-12' THEN Status END),MAX(CASE cr_date WHEN '2017-07-13' THEN Status END),  MAX(CASE cr_date WHEN '2017-07-14' THEN Status END)FROM (select rl.riderid,l.locname,hs.htspnm,r.fname || ' '  || r.lname as rider_name,rl.cr_date::text,case when sum(case when rl.onoff=true then 1 else 0 end)>=1 and sum(case when rl.onoff=false then 1 else 0 end) >=1 then 'P' else 'A' end Status from mrcht.tblrideronllog rl inner join mrcht.tblrider r on r.rdrid=rl.riderid inner join mrcht.tblhotspot hs on r.hsid=hs.htspid inner join ginv.location l on r.city=l.locid group by rl.riderid,rl.cr_date,rider_name,l.locname,hs.htspnm order by l.locname,hs.htspnm,rl.riderid,rl.cr_date) a  group by rider_name,locname,htspnm,rider_name", [req.body], function(data) {
        rs.resp(res, 200, data.rows[0]);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

order.updateOrderDetails = function updateOrderDetails(req, res, done) {
    db.callFunction("select " + globals.merchant("funupdate_orderdetails") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows[0].funupdate_orderdetails);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

//cancel order for api

order.CancelOrder = function CancelOrder(data, callback) {
    db.callFunction("select " + globals.merchant("funupdate_orderdetails") + "($1::json);", [data], function(data) {
        callback(null, data.rows[0].funupdate_orderdetails);
    }, function(err) {
        callback(err, "");
    })
}

order.getOrderDetails = function getOrderDetails(req, res, done) {
    db.callProcedure("select " + globals.merchant("funget_orderdetails") + "($1,$2::json);", ['bi', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}

order.getDailyOrderDetails = function getDailyOrderDetails(req, res, done) {
    db.callProcedure("select " + globals.merchant("funget_dailyorderdetails") + "($1,$2,$3::json);", ['cus1', 'cus2', req.query], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 2)
}

// for get tting details of order 

order.getFullOrderDetails = function getFullOrderDetails(req, res, done) {
    db.callProcedure("select " + globals.merchant("funget_fullorderdetails") + "($1,$2::json);", ['bi', req.query], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}

// get status of order

order.getOrderStatus = function getOrderStatus(data, callback) {
    db.callProcedure("select " + globals.merchant("funget_fullorderdetails") + "($1,$2::json);", ['bi1', data], function(data) {
        callback(null, data.rows);
    }, function(err) {
        callback(err, "");
    }, 1)
}

order.getapiOrders = function getapiOrders(req, res, done) {
    db.callProcedure("select " + globals.merchant("api_funget_orderdetails") + "($1,$2::json);", ['orddet', req.query], function(data) {
        if (data.rows.length > 0 && data.rows[0].status != undefined && !data.rows[0].status) {
            data.rows = [];
        }

        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}

order.getapiOrdersCounts = function getapiOrdersCounts(req, res, done) {
    db.callProcedure("select " + globals.merchant("api_funget_ordcount") + "($1,$2::json);", ['ordcount', req.query], function(data) {
        if (data.rows.length > 0 && data.rows[0].status != undefined && !data.rows[0].status) {
            data.rows = [];
        }

        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}