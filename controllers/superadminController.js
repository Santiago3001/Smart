const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../config/conexion');
const adminModel= require('../model/adminModel');
const superAdminModel = require("../model/superAdminModel");
var transporter=require('../config/servicioEmail');
module.exports = {
    
    asignarCredenciales: async (req, res) => {
    
    let hashedDni =  await bcrypt.hash(req.body.dni, 8);
    adminModel.establecerPassword(db,hashedDni,(error, results)=> {
        if (error){
            console.log(error);
        } else {
           console.log(results); 
           return res.status(400).render('register',{
            messageError:'Se genero correctamente la contraseña'
         })        
                    }
        })
        
    
    },
    
    mostrarAdmin:(req,res) => {
        superAdminModel.obtenerAdmin(db,function (err, datos) {
           if (err){
              console.log(error);
          } else {
             return res.render('superAdmin', {admin:datos }); 
                              }
          })
      },

      habAdmin: async function (req, res) {
        let hashedDni =  await bcrypt.hash(req.body.dni, 8);
        console.log(req.body); 
        if (req.body.estado === '1' ) {
            
        superAdminModel.habilitarAdmin(db,req.body,hashedDni,(error, results)=> {
            if (error){
                console.log(error);
            } else {  
                    let mailOptions = {
                        from: 'smartrazservicios@gmail.com',
                        to: req.body.email,
                        subject: 'Servicio SMARTTRAZ',
                        text: 'Sr/a'+' '+ req.body.apellidos+' '+req.body.nombres+' '+'su cuenta para acceder al servicio de SMARTRAZ es:'+'\nUsuario'+' '+req.body.email +' '+'\nContraseña:' +' '+req.body.dni
                    };
                    
                    transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        return console.log(error.message);
                    }
                    console.log('success');   
                    console.log(results)
                    return res.render('superAdmin', {admin:results });             
                     });

                  
                 }                       
            })
        

        }
    }
}
