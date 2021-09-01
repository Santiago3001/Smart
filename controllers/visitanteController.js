
const db = require('../config/conexion');
const visitanteModel= require('../model/visitanteModel');
const personalModel= require('../model/personalModel');
const establecimientoModel= require('../model/establecimientoModel');
// const asistenciaModel = require('../model/asistenciaModel');
var transporter=require('../config/servicioEmail')
var sd = require('silly-datetime');


module.exports={

   
    /*Se registra el visistante por primera vez y a su vez su asistencia*/
    regVisit: function(req, res) {

        //Generar alfanumerico random para pasar al visitante 
        const  generateRandomString = (num) => {
            const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let result1= Math.random().toString(36).substring(0,num);       
            return result1;
        }   
         
        let random=generateRandomString(5)
                personalModel.buscSuc(db,function(error,result){
                    if (error) {
                        console.log(error);
                    } else { 
                        console.log(random)
                        let mailOptions = {
                            from: 'smartrazservicios@gmail.com',
                            to: req.body.email,
                            subject: 'Servicio SMARTTRAZ',
                            text: 'Sr/a'+' '+ req.body.apellidos+' '+req.body.nombres+' '+'en caso de que resulte a COVID-19 positivo, por favor ingrese al siguiente link localhost:3000/reportes/verificar,para registar su caso con el siguiente código'+'\nCódigo de verificación:' +' '+random
                        };
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            return console.log(error.message);
                        }
                        console.log('success');            });
                        let suc = result[0].usuSesion
                //registrar los datos del visitante dni mas codigo de verificacion random
                visitanteModel.registrarVisitante(db,req.body,random,suc);
                         
                //registrar asistencia por primera vez del visitante
                let dniVisitante =req.body.dni;
                var fecha =sd.format(new Date(), 'YYYY-MM-DD');
                let hsi = sd.format(new Date(), 'HH:mm');
                visitanteModel.regAsist(db,req.body, fecha, hsi, dniVisitante );

                establecimientoModel.mostrarEstablecimiento(db,suc,function (err, datos) {
                    if (err){
                       console.log(error);
                   } else {
                      visitanteModel.mostrarAsistencia(db,function (err, datos2) {
                        if (err){
                           console.log(error);
                       } else {
                           
                          return res.render('seguridad/index', {asistencia:datos2,establecimiento:datos }); 
                                           }
                       })
                   }
                     
                                       
                   })
                }
            })
    },
    regAsistencia:(req,res) => {
        
        let dni2=req.body.dni
        personalModel.buscDni(db,req.body.dni,dni2,(error,results) => {
            if (results){
                console.log(results)
            }
           
        })
        

        /*Si es personal se busca en la tabla personal que exista su dni
            si existe se registra asistencia sino se informa al personal de seguridad*/
       if(req.body.tipo=='p'  ) {
            personalModel.buscarPersonal(db,req.body.dni,(error,results) => {
            
                let establ = results[0].idEstable
                console.log(establ)
                if(results.length >0) {
       
                    let dniVisitante = results[0].dni;
                    console.log(dniVisitante)

                    
                    var fecha =sd.format(new Date(), 'YYYY-MM-DD');
                    let hsi = sd.format(new Date(), 'HH:mm');
                    
                   //Verificar que el personal se encuentra habilitado para ingresar al local     
                    if(results[0].habilitado == 'deshabilitado') {
                        establecimientoModel.mostrarEstablecimiento(db,establ,function (err, datos) {
                            if (err){
                              console.log(error);
                           } else {
                               visitanteModel.mostrarAsistencia(db,function (err, datos2) {
                                if (err){
                                   console.log(error);
                               } else {
                                 return res.render('seguridad/index', {asistencia:datos2,establecimiento:datos,messageError:'El personal no   se encuentra habilitado para ingresar al local' }); 
                                                   }
                               })
                           }
                                               
                           })
                    }
                                    
                //Se usa buscarPS para hacer el control de que solo se registre una sola vez la asistencia
                visitanteModel.buscarPS(db,dniVisitante,(error,results) => {
                   
                    if(results.length > 0) {
                        establecimientoModel.mostrarEstablecimiento(db,establ,function (err, datos) {
                            if (err){
                               console.log(error);
                           } else {
                               visitanteModel.mostrarAsistencia(db,function (err, datos2) {
                                if (err){
                                   console.log(error);
                               } else {
                                   
                                  return res.render('seguridad/index', {asistencia:datos2,establecimiento:datos,messageError:'El visitante ya se encuentra dentro de local porfavor verifique el dni ingresado' }); 
                                                   }
                               })
                           }
                             
                                               
                           })
        

                    } 
                    else {  
                    visitanteModel.regAsist(db,req.body, fecha, hsi, dniVisitante);

                    establecimientoModel.mostrarEstablecimiento(db,establ,function (err, datos) {
                        if (err){
                           console.log(error);
                       } else {
                           visitanteModel.mostrarAsistencia(db,function (err, datos2) {
                            if (err){
                               console.log(error);
                           } else {
                             
                              return res.render('seguridad/index', {asistencia:datos2,establecimiento:datos,messageExito:'Se registro la asistencia del personal' }); 
                                               }
                           })
                       }
                         
                                           
                       })

                    }

                })
    
    

                        //}

                    //})
                  
                } else  {
                    personalModel.buscSuc(db,(error,result)=>{
                    if(error){
                      console.log(error);
                    }else{  
                        let establ = result[0].usuSesion; 
                        console.log(establ);
                        establecimientoModel.mostrarEstablecimiento(db,establ,function (err, datos) {
                            if (err){
                               console.log(error);
                           } else {
                               visitanteModel.mostrarAsistencia(db,function (err, datos2) {
                                if (err){
                                   console.log(error);
                               } else {
                                    return res.render('seguridad/index',
                                   {asistencia:datos2,establecimiento:datos,messageError:'El personal no se encuentra en el sistema vuelva a ingresar el dni' }); 
                                                   }
                               })
                        }
                                           
                
                })}
                   


                    })
            
           }
        })
    

    }else{

         /*Acceso de un cliente se busca el dni si encuentra registra asistecia sino se debe 
          registrar al visitante y a su vez registrar su asistencia  
         */
         visitanteModel.buscDni(db,req.body.dni,(error,results) => {
            if (error) {
                console.log(error); }
        
            if(results.length >0) {
               
                
                let dniVisitante =results[0].dni;
                var fecha =sd.format(new Date(), 'YYYY-MM-DD');
                let hsi = sd.format(new Date(), 'HH:mm');
                let establ = results[0].idEstable

                //verificar si el visitante se encuentra habilitado para ingresar al local
                if(results[0].habilitado == 'deshabilitado') {
                    establecimientoModel.mostrarEstablecimiento(db,establ,function (err, datos) {
                        if (err){
                          console.log(error);
                       } else {
                           visitanteModel.mostrarAsistencia(db,function (err, datos2) {
                            if (err){
                               console.log(error);
                           } else {
                             return res.render('seguridad/index', {asistencia:datos2,establecimiento:datos,messageError:'El visitante se encuentra deshabilitado para ingresar al local' }); 
                                               }
                           })
                       }
                                           
                       })
                }
                //Uso buscarPS para hacer el control de que solo se registre una sola vez la asistencia
                visitanteModel.buscarPS(db,dniVisitante,(error,results) => {
            
                  
                    if(results.length > 0) {
                        establecimientoModel.mostrarEstablecimiento(db,establ,function (err, datos) {
                            if (err){
                               console.log(error);
                           } else {
                               visitanteModel.mostrarAsistencia(db,function (err, datos2) {
                                if (err){
                                   console.log(error);
                               } else {
                                   
                                  return res.render('seguridad/index', {asistencia:datos2,establecimiento:datos,messageError:'el visitante ya ingreso' }); 
                                                   }
                               })
                           }
                             
                                               
                           })
        

                    } //} ) 
                    else {
                personalModel.buscSuc(db, function (err,results) {
                    if (err){
                        console.log(error);
                    } else { 
                        let suc = results[0].usuSesion;  
                visitanteModel.regAsist(db,req.body, fecha, hsi, suc,dniVisitante);
                console.log(results[0])
                establecimientoModel.mostrarEstablecimiento(db,establ,function (err, datos) {
                    if (err){
                       console.log(error);
                   } else {
                       visitanteModel.mostrarAsistencia(db,function (err, datos2) {
                        if (err){
                           console.log(error);
                       } else {
                           
                          return res.render('seguridad/index', {asistencia:datos2,establecimiento:datos,messageExito:'El visitante ingreso al local' }); 
                                           }
                       })
                   }
                     
                                       
                   }) }
                })
                   
                } } ) 
              
            } else  {
             
                personalModel.buscSuc(db,(error,result)=>{
                    if(error){
                      console.log(error);
                    }else{  
                        let establ = result[0].usuSesion; 
                        console.log(establ);
                        establecimientoModel.mostrarEstablecimiento(db,establ,function (err, datos) {
                            if (err){
                               console.log(error);
                           } else {
                               visitanteModel.mostrarAsistencia(db,function (err, datos2) {
                                if (err){
                                   console.log(error);
                               } else {
                                   console.log(datos)
                                   console.log(datos2)
                                  return res.render('seguridad/index',
                                   {asistencia:datos2,establecimiento:datos,messageError:'El visitante no se encuentra en el sistema, por favor registre al nuevo visitante' }); 
                                                   }
                               })
                        }
                
                   
                
                })}
                   


                    })
            }                  
        
        })



    }       
        
      },
       regSalida:(req,res) => { 
        
        visitanteModel.buscarPS(db,req.body.dni,(error,results) => {
            
             if (error) {
                 console.log(error);    }
                console.log(results[0])
             if(results.length > 0 && results[0].enLocal==1) {
                // var fecha =sd.format(new Date(), 'YYYY-MM-DD');
                var dniV = results[0].dniVisitante
                let hsi = sd.format(new Date(), 'HH:mm');
                visitanteModel.regSal(db, hsi, dniV);
               
                personalModel.buscSuc(db,function(error,result){
                    if (error) {
                        console.log(error);
                    } else { 
                        let suc = result[0].usuSesion 
            
                 establecimientoModel.mostrarEstablecimiento(db,suc,function (err, datos) {
                    if (err){
                       console.log(error);
                   } else {
                       visitanteModel.mostrarAsistencia(db,function (err, datos2) {
                        if (err){
                           console.log(error);
                       } else {
                           console.log(datos)
                           console.log(datos2)
                          return res.render('seguridad/index', {asistencia:datos2,establecimiento:datos,messageExito:'Se registro exitosamente la salida del visitante' }); 
                                           }
                       })
                   }
                     
                                       
                   })
             } 
         
            
         
         })
         
     }else{
        personalModel.buscSuc(db,(error,result)=>{
            if(error){
              console.log(error);
            }else{  
                let establ = result[0].usuSesion; 
                console.log(establ);
                establecimientoModel.mostrarEstablecimiento(db,establ,function (err, datos) {
                    if (err){
                       console.log(error);
                   } else {
                       visitanteModel.mostrarAsistencia(db,function (err, datos2) {
                        if (err){
                           console.log(error);
                       } else {
                           console.log(datos)
                           console.log(datos2)
                          return res.render('seguridad/index',
                           {asistencia:datos2,establecimiento:datos,messageError:'La persona no se encuentra en el local porfavor verifique el dni ingresado' }); 
                                           }
                       })
                }
        
           
        
        })}
           


            })
     }
    })
      }




}
