var global = module.exports = {};

global.mainapiurl = "http://localhost:3000/api/";
global.menuurl = "http://localhost:3005/#/";
global.adminurl = "http://localhost:3003/#/";
global.logourl = "http://localhost:8092/logo";
global.reporturl = "http://localhost:8086";

// global.mainapiurl = "http://admin.goyo.in:8081/api/";
// global.menuurl = "http://menu.goyo.in/#/";
// global.adminurl = "http://order.goyo.in/#/";
// global.logourl = "http://order.goyo.in:8082/logo";
// global.reporturl = "http://order.goyo.in:8086";


// database settings

global.prodmode = {
    "local": 1,
    "localprod": 2,
    "prod": 3
}

global.mode = global.prodmode.prod;

global.globvar = {
    "rootAPI": "/goyoapi",
    "marketapi": "/marketapi"
}

global.schema = function schema(params) {
    return "ginv." + params;
};

global.schema2 = function schema2(params) {
    return "mrktn." + params;
};

global.menuschema = function menuschema(params) {
    return "menu." + params;
};

global.merchant = function merchant(params) {
    return "mrcht." + params;
};

// do not use 

global.constr = function constr() {
    // return 'postgres://postgres:123@192.168.1.108:5432/goyo_order';
    // return 'postgres://postgres:sa@123@13.126.2.220:5432/goyo_ordering';
};

global.pgdbconnection = {};

global.monconstr = function constr() {
    //return 'postgres://postgres:123@192.168.1.107:5432/goyo_marketing';
    return 'mongodb://127.0.0.1:27017/goyosch';
};

global.reportTemplatePath = function reportTemplatePath() {
    if (global.mode == global.prodmode.prod)
        return __dirname + '/reports/templates';
    else
        return __dirname + '/reports/templates';
};

global.getDir = function getDir() {
    if (global.mode == global.prodmode.prod)
        return __dirname;
    else
        return __dirname;
};

global.reportRootPath = function reportRootPath() {
    if (global.mode == global.prodmode.prod)
        return __dirname + '/reports';
    else
        return __dirname + '/reports';
};

global.pgdbconnection = {
    user: 'postgres', //env var: PGUSER
    database: 'goyo_order', //env var: PGDATABASE
    password: '123', //env var: PGPASSWORD
    host: '192.168.1.108', // Server hosting the postgres database
    // host: 'localhost', // Server hosting the postgres database
    port: 5432, //env var: PGPORT
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

// global.pgdbconnection = {
//     user: 'postgres', //env var: PGUSER
//     database: 'goyo_ordering', //env var: PGDATABASE
//     password: 'sa@123', //env var: PGPASSWORD
//     host: 'order.goyo.in', // Server hosting the postgres database
//     port: 5432, //env var: PGPORT
//     max: 10, // max number of clients in the pool
//     idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
// };


// if (global.mode == global.prodmode.localprod) {
//     global.pgdbconnection = {
//         user: 'postgres', //env var: PGUSER
//         database: 'goyo_ordering', //env var: PGDATABASE
//         password: 'sa@123', //env var: PGPASSWORD
//         host: 'order.goyo.in', // Server hosting the postgres database
//         port: 5432, //env var: PGPORT
//         max: 10, // max number of clients in the pool
//         idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
//     };
// }
// else if (global.mode == global.prodmode.local) {
//      global.pgdbconnection = {
//          user: 'postgres', //env var: PGUSER
//          database: 'goyo_order', //env var: PGDATABASE
//          password: '123', //env var: PGPASSWORD
//          host: '192.168.1.108', // Server hosting the postgres database
//          port: 5432, //env var: PGPORT
//          max: 10, // max number of clients in the pool
//          idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
//      };
// }
// else if (global.mode == global.prodmode.prod) {
//     global.pgdbconnection = {
//         user: 'postgres', //env var: PGUSER
//         database: 'goyo_ordering', //env var: PGDATABASE
//         password: 'sa@123', //env var: PGPASSWORD
//         host: '127.0.0.1', // Server hosting the postgres database
//         port: 5432, //env var: PGPORT
//         max: 10, // max number of clients in the pool
//         idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
//     };
// }