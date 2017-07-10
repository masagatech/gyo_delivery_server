var Handlebars = require('handlebars');

var reportsorder = module.exports = {};

//handlebar resolver
reportsorder.resolveTemplate = function resolveTemplate(data){
//declare global variables 
        var _hndlbar = Handlebars;
        var cols = [],Total = [];
        for(var i =0; i <= 31 - 1;i++ ){cols[i] = i + 1;Total[i] = 0;};
        //grand total
        Total[31] = 0;
        //register handlebar helpers
        _hndlbar.registerHelper('vtotal',function(params) {
            var total =0;
                for(var i =0; i <= cols.length -1;i++ ){
                    var _d = params[cols[i]];
                    
                    if(typeof _d == "number"){
                        total = total + parseInt(_d);
                        Total[i] = Total[i] + parseInt(_d);
                        Total[31] = Total[31] + parseInt(_d);
                    }
                }
                return total;
        });
        
            _hndlbar.registerHelper('isnull',function(params) {
                if(typeof params !== "number"){ params = 0; }
                return params;
        });

        _hndlbar.registerHelper('total',function() {  
            var _footertotal = '<td class="text-center bold">'
                        for(var i =0; i <= Total.length -1;i++ ){
                            _footertotal = _footertotal + '<td class="text-center bold">'+ Total[i]  +'</td>'
                        } 
                return _footertotal;
        });
        return  _hndlbar
             //represt.resp('rider/monthlyorder-pdf.html', { data: data }, null, res, null,{ pdfoptions:{orientation : "landscape"}});
            
}

