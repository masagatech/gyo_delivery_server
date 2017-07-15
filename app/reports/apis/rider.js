var Handlebars = require('handlebars');

var riderReports = module.exports = {};

//handlebar resolver
riderReports.monthlyOrders = function resolveTemplate(data){
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
            var _footertotal = ''
                        for(var i =0; i <= Total.length -1;i++ ){
                            _footertotal = _footertotal + '<td class="text-center bold">'+ Total[i]  +'</td>'
                        } 
                return _footertotal;
        });
        return  _hndlbar
             //represt.resp('rider/monthlyorder-pdf.html', { data: data }, null, res, null,{ pdfoptions:{orientation : "landscape"}});
            
}

riderReports.monthlyAttendence = function resolveTemplate(data){
//declare global variables 
        var _hndlbar = Handlebars;
        data_header=data.data2;
        data_cols=data.data;
      
        _hndlbar.registerHelper('header',function() {  
            var _footertotal = ' '
                        for(var i =0; i<data_header.length;i++ ){
                            _footertotal = _footertotal + '<th>'+ data_header[i]['date']+' '+  data_header[i]['day'] +'</td>'
                        } 
                return _footertotal;
        });
        _hndlbar.registerHelper('date_cols',function(row) {  
            var _footertotal = ''
             var total_present=0,total_abesent=0,total_leave=0,total = 0;
            let data= '';
                        for(var i =0; i < data_header.length;i++ ){
                            data = row[i + 4];
                            if(data=='P'){
                                total_present++;
                            }if(data=='A'){
                                total_abesent++;
                            }if(data=='L'){
                                total_leave++;
                            }if(data=='P' || data=='A' || data=='L'){
                                total++;
                            }
                            _footertotal = _footertotal + '<td class="text-center">'+ (data == null ? '-' : data) +'</td>'
                        } 
                         _footertotal+='<td class="text-center">'+total_present+'</td>';
                         _footertotal+='<td class="text-center">'+total_abesent+'</td>';
                         _footertotal+='<td class="text-center">'+total_leave+'</td>';
                         _footertotal+='<td class="text-center">'+total+'</td>';
                return _footertotal;
        });
        return  _hndlbar
}




