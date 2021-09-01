//Requerimos los paquetes
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../config/conexion');
var usuariosModel=require('../model/usuariosModel');
//-- Servicio de email--//
//requerimos paquete
const nodemailer = require('nodemailer');
var transporter=require('../config/servicioEmail');
const establecimientoModel = require('../model/establecimientoModel');
const asistenciaModel=require('../model/asistenciaModel');

module.exports={

    

    login:async (req,res) => {
        try {
           const {email, password} = req.body;
       
           if(!email || !password) {
             return res.status(400).render('login',{
                 messageError:'Introduzca el email o contraseña'
             })  
           }
       
           usuariosModel.loginUsuario(db,email,async (error,results) => {
              
            console.log(results);
            //console.log(results[0].rol)
            if(!results || !(await bcrypt.compare(password, results[0].password ) ) ) {
               res.status(401).render('login', {
                   messageError:'Email o contraseña incorrectas'
               }) 
            } else {
                
                
                if(results[0].rol=='administrador'){ 
                
                usuariosModel.guardarSesion(db,results[0].idEstabl)
               
                establecimientoModel.mostrarEstablecimiento(db,results[0].idEstabl,function (err, datos) {
                    if (err){
                       console.log(error);
                   } else {
                    console.log(datos);
                      return res.render('administrador/index', {establecimiento:datos }); 
                                       }
                   })
                }
                else {
                    usuariosModel.guardarSesion(db,results[0].idEstabl)
                    establecimientoModel.mostrarEstablecimiento(db,results[0].idEstabl,function (err, datos) {
                        if (err){
                           console.log(error);
                       } else {
                           asistenciaModel.mostrarAsistencia(db,function (err, datos2) {
                            if (err){
                               console.log(error);
                           } else {
                               console.log(datos)
                               console.log(datos2)
                              return res.render('seguridad/index', {asistencia:datos2,establecimiento:datos }); 
                                               }
                           })
                       }
                                           
                       })
                   

                }
    
            }
        }) 
        } catch (error) {
            console.log(error);
        }
       }
    


}