var represt = require("reportutil");

var printjob = module.exports = function download(req,res, data, template, resolveTemplate){
        var filetype = req.query["format"];
        var filename = req.query["filename"]

        if(!filename){
            filename = "download"
        }


        if(!filetype){
         res.status(200).send("format not specified!");    
        }
      

        else if(filetype=="csv"){
            fields=Object.keys(data[0]);      
            var json2csv = require('json2csv');
            var result = json2csv({ data: data,fields:fields });
            res.setHeader('Content-disposition', 'attachment; filename='+filename+'.csv');
            res.set('Content-Type', 'text/csv');
            res.status(200).send(result);      
        }else if(filetype=='xls'){
             
            // result=js2html(data);  
            //result=represt.resp('rider/monthlyorder-pdf.html',{ data: data},null, res,null,{onlyHtml:true });
            result = represt.resp(template, data, null, res, null,
            {onlyHtml:true , pdfoptions:{orientation : "landscape"}}, resolveTemplate(data));
            res.setHeader('Content-disposition', 'attachment; filename='+ filename +'.xls');
            res.set('Content-Type', 'application/vnd.ms-excel');
            res.status(200).send(result);      
        }else if(filetype=='pdf'){
            represt.resp(template, data, null, res, null,
            {onlyHtml:false , pdfoptions:{orientation : "landscape"}}, resolveTemplate(data));
            // represt.resp('rider/monthlyorder-pdf.html', { data: data }, null, res, null,{ pdfoptions:{orientation : "landscape"}});
        }else{
             res.status(200).send("Invalid File Type!"); 
    }
}
         