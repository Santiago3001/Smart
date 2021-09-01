//Requerimos los paquetes
var conexion=require('../config/conexion');
var personalModel=require('../model/personalModel');
var usuariosModel=require('../model/usuariosModel');
//-- Servicio de email--//
//requerimos paquete
const nodemailer = require('nodemailer');
var transporter=require('../config/servicioEmail')
const bcrypt = require('bcryptjs');

module.exports={

regPersonal: function(req, res) {

    personalModel.buscSuc(conexion, async (error,results) => { 

        console.log(req.body); 
        let hashedDni =  await bcrypt.hash(req.body.dni, 8); 
        let suc = results[0].usuSesion;  
        personalModel.insertarPersonal(conexion,req.body,suc,(error, results)=> {
            if (error){
                console.log(error);
            } else {
                let nombre = req.body.nombres
                let apellido = req.body.apellidos
                if (req.body.cargo === 'seguridad') {
                                     
                    usuariosModel.registrarSeguridad(conexion,req.body,hashedDni,suc)
                    
                    let mailOptions = {
                        from: 'smartrazservicios@gmail.com',
                        to: req.body.email,
                        subject: 'Servicio SMARTTRAZ',
                        text: 'Sr/a'+' '+ apellido+' '+nombre+' '+'su cuenta para acceder al servicio de SMART TRAZ como personal de seguridad es:'+'\nUsuario'+' '+req.body.email +' '+'\nContraseña:' +' '+req.body.dni
                    };
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        return console.log(error.message);
                    }
                    console.log('success');
                });
            }
                    console.log(results); 
                                                         }
        })
        
        personalModel.obtenerPerso(conexion,suc,function (err, datos) {
            if (err){
               console.log(error);
           } else {
              return res.render('administrador/gestionPersonal', {personal:datos }); 
                               }
           })


        })
    },




    mostrarPerso:(req,res) => {
        personalModel.buscSuc(conexion,(error,results) => {
        let suc = results[0].usuSesion;  

        personalModel.obtenerPerso(conexion,suc,function (err, datos) {
           if (err){
              console.log(error);
          } else {
             return res.render('administrador/gestionPersonal', {personal:datos }); 
                              }
          })
      }
        )}

}

