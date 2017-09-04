var rs = module.exports = {};


rs.resp = function resp(res, status, data) {
    res.status(status);
    res.json({
        "status": status,
        "data": data
    });
}

rs.resp_api = function resp(res, data) {
    res.status(data.status ? 200 : 201);
    res.json(data);
}


rs.gridresp = function gridresp(res, status, data) {
    res.status(status);
    res.json({
        "status": status,
        "data": data[0],
        "draw": data[1][0].draw,
        "recordsTotal": data[1][0].recordstotal,
        "recordsFiltered": data[1][0].recordsfiltered,
    });
}