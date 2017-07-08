var global = module.exports = {};

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

global.merchant = function merchant(params) {
    return "mrcht." + params;
};

global.constr = function constr() {
    // return 'postgres://postgres:123@127.0.0.1:5432/goyo_groc';

    // return 'postgres://postgres:123@192.168.1.105:5432/goyo_sch';
    return 'postgres://postgres:sa@123@13.126.2.220:5432/goyo_ordering';
    //return 'postgres://postgres:sa@123@13.126.2.220:5432/goyo_ordering';
    //return 'postgres://postgres:sa@123@35.154.230.244:5432/goyo_app';
};

global.monconstr = function constr() {
    //return 'postgres://postgres:123@192.168.1.107:5432/goyo_marketing';
    return 'mongodb://127.0.0.1:27017/goyosch';
};

global.reportTemplatePath = function reportTemplatePath() {
    console.log(__dirname + '\\reports\\templates');
    return __dirname + '\\reports\\templates';
};
global.reportRootPath = function reportRootPath() {
    console.log(__dirname + '\\reports');
    return __dirname + '\\reports';
};