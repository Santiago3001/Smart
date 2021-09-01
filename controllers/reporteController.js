//Requerimos los paquetes
var conexion=require('../config/conexion');
var visitanteModel=require('../model/visitanteModel');
var reportesModel = require ('../model/reportesModel');
var personalModel = require('../model/personalModel');
var sd = require('silly-datetime');


module.exports={

verificacion: function(req, res) {
    
    visitanteModel.verificarDniRandom(conexion,req.body.dni,req.body.codigo,(err,results)=>{
         
        

        if(results.length >0 ){
             
            reportesModel.insertarReporte(conexion,results[0].dni)
            console.log(results[0].dni)
          
            return res.render('reportes/reporte',{visitante:results}); 
            //res.status(200).redirect('/reportes/reporte',{visitante:results});

        }
        else {
            return res.render('reportes/verificacion',{messageError:'Verifique los datos ingresados y vuelva a ingresar'}); 

         }
    })
    
},

guardar:function (req,res){
    console.log(req.body);
    console.log(req.file.filename);
     
    reportesModel.fechapositivo(conexion,req.body,req.file)
    console.log(req.body);
    // Aca tenemos que hacer los calculos de la fecha si e lcampo verificado es si
    //var d = new Date();
    //console.log(d);
    //var f = new Date(str);
    //console.log(d);
    //f = req.body - d ;
    // console.log(f);
   // console.log(sumarDias(d, 10));
   
    //function sumarDias(fechaAlta, dias){
    //fechaAlta.setDate(req.body + dias);
    //console.log(req.body);
    //console.log(dias);
    //return fechaAlta ;
   // }


},

mostrarRepo:(req,res) => {
    personalModel.buscSuc(conexion,(error,results) => {
    let suc = results[0].usuSesion;  


    reportesModel.obtenerRepo(conexion,suc,function (err, datos) {
       if (err){
          console.log(error);
      } else {
         return res.render('administrador/reportesPositivos', {reporte:datos }); 
                          }
      })

  } )},
  

  validarRepo: (req,res) => {
     let dni =req.body.dni
     console.log(req.body)
     visitanteModel.desabhilitar(conexion,dni)
     
    
     var str = req.body.fechTestPositivo;
     
     var dt= new Date(parseInt(str.substring(0,4),10),
                      parseInt(str.substring(5,7),10)-1,
                     parseInt(str.substring(8,10),10));

     var str1 = req.body.fechTestPositivo;
     var dt2= new Date(parseInt(str1.substring(0,4),10),
                    parseInt(str1.substring(5,7),10)-1,
                     parseInt(str1.substring(8,10),10));
                
                                            
                      

     function restarDias(fecha, dias){
        fecha.setDate(fecha.getDate() + dias);
        return fecha;
      }

      var resultadoresta = restarDias(dt, -4)

      function sumarDias(fecha2, dias){
        fecha2.setDate(fecha2.getDate() + dias);
        return fecha2;
      }
     
     
    
      var resultadosuma = sumarDias(dt2, +5+5)
     

      console.log(resultadoresta, resultadosuma)

     








    }

}

