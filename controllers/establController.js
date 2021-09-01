const mysql = require("mysql");
const db = require('../config/conexion');
const establecimientoModel = require("../model/establecimientoModel");
const personalModel = require("../model/personalModel");


exports.registroEstabl = (req, res) => {
    console.log(req.body);
    
    if(req.body.nombre === '' ){
        return res.status(400).render('administrador/establecimiento',{
            messageError:'Introduzca el nombre del establecimiento'
        })
       }

    if(req.body.cuit === ''){
        return res.status(400).render('administrador/establecimiento',{
           messageError:'Introduzca el cuit/cuil del establecimiento'
        })
       }

    if(req.body.direccion === ''){
        return res.status(400).render('administrador/establecimiento',{
           messageError:'Introduzca la direccion del establecimiento'
        })
       }

    if(req.body.localidad === ''){
        return res.status(400).render('administrador/establecimiento',{
           messageError:'Introduzca la localidad del establecimiento'
        })
       }

    if(req.body.provincia === ''){
        return res.status(400).render('administrador/establecimiento',{
           messageError:'Introduzca la provincia del establecimiento'
        })
       }
        
    if(req.body.descripcion === ''){
      return res.status(400).render('administrador/establecimiento',{
           messageError:'Introduzca la descripción del establecimiento'
        })
       }

       personalModel.buscSuc(db,(error,results) => {
         let suc = results[0].usuSesion; 

    establecimientoModel.insertarEstbl(db,req.body,suc,(error, results)=> {
        if (error){
            console.log(error);
        } else {
           console.log(req.body);
           establecimientoModel.obtenerEstbl(db,suc,function (err, datos) {
            console.log(datos)
            if (err){
               console.log(error);
           } else {
              return res.render('administrador/establecimiento', {establecimientos:datos,messageExito: 'Establecimiento registrado' }); 
                               }
           }) 
        
                    }
        })
       })

    },


    exports.mostrarEstbl= (req,res) => {
      personalModel.buscSuc(db,(error,results) => {
         let suc = results[0].usuSesion;  

      establecimientoModel.obtenerEstbl(db,suc,function (err, datos) {
         if (err){
            console.log(error);
        } else {
           return res.render('administrador/establecimiento', {establecimientos:datos }); 
                            }
        })

    })
   },

    exports.parametros = (req, res) => {
      console.log(req.body);
  
      personalModel.buscSuc(db,(error,results) => {
      let suc = results[0].usuSesion; 
      console.log(req.body)

      establecimientoModel.insertarParam(db,req.body,suc,(error, results)=> {
         
          if (error){
              console.log(error);
          } else {

            establecimientoModel.obtenerEstbl(db,suc,function (err, datos) {
               console.log(datos)
               if (err){
                  console.log(error);
              } else {
                 return res.render('administrador/establecimiento', {establecimientos:datos,messageExito: 'Establecimiento registrado' }); 
                                  }
              })

          
                      }
          })
      
         })
      }


    