const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../config/conexion');
const adminModel= require('../model/adminModel');
const establecimientoModel = require("../model/establecimientoModel");
var transporter=require('../config/servicioEmail');

const nodemailer = require('nodemailer');
const personalModel = require("../model/personalModel");
exports.login = async (req,res) => {
    try {
       const {email, password} = req.body;
   
       if(!email || !password) {
         return res.status(400).render('login',{
             messageError:'Introduzca el email o contraseña'
         })  
       }
   
       adminModel.loginAdmin(db,email,async (error,results) => {
          
        console.log(results);
        if(!results || !(await bcrypt.compare(password, results[0].password ) ) ) {
           res.status(401).render('login', {
               messageError:'Email o contraseña incorrectas'
           }) 
        } else {
            const id= results[0].id;

            const token = jwt.sign({id: id }, process.env.JWT_SECRET,{
                expiresIn: process.env.JWT_EXPIRES_IN
            });

            console.log("token is" + token);

            const cookieOptions={
                expires: new Date (
                    Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                ),
                htppOnly: true
            }  
            
            res.cookie('jwt', token,cookieOptions);
            
            res.status(200).redirect('/administrador/index');

        }
    }) 
    } catch (error) {
        console.log(error);
    }
   }

exports.register = (req, res) => {
    console.log(req.body);
    const {  email, password, passwordConfirm} = req.body;
    if(req.body.nombres === ''){
        return res.status(400).render('register',{
           messageError:'Introduzca nombre de Administrador'
        })
       }
    if(req.body.apellidos === ''){
        return res.status(400).render('register',{
           messageError:'Introduzca apellido de Administrador'
        })
       }
    if(req.body.dni === ''){
        return res.status(400).render('register',{
           messageError:'Introduzca dni del Administrador'
        })
       }   
    if(req.body.telefono === ''){
        return res.status(400).render('register',{
           messageError:'Introduzca telefono del Administrador'
        })
       }
        
    adminModel.buscEmail(db,email, async (error,results) => { 
        if (error) {
            console.log(error);    }
    
        if(results.length >0) {
            return res.render('register', {
                messageError: 'Este correo electronico ya esta en uso'
            })
        } else if( password !== passwordConfirm ) {
            return res.render('register',{
                messageError: 'Las contraseñas no coinciden'
            });
        }
    
    })

    adminModel.insertar(db,req.body,(error, results)=> {
        if (error){
            console.log(error);
        } else {
           console.log(results); 
            
           let mailOptions = {
            from: 'smartrazservicios@gmail.com',
            to: req.body.email,
            subject: 'Servicio SMARTTRAZ',
            text: 'Sr/a'+' '+ req.body.apellidos+' '+req.body.nombres+' '+'Bienvenido al servicio de SMART TRAZ, hemos recibido su solicitud nos estaremos contactando con usted a la brevedad.'+'\nMuchas gracias...!!!'}


            transporter.sendMail(mailOptions, (error, info) => {
                 if (error) {
                return console.log(error.message);
                     }
                console.log('success');
                });             
             }
        })

    
    adminModel.insertarIdEstbl(db,(error, results)=> {
        if (error){
            console.log(error);
        } else {
            //return res.render('index', {messageExito: 'Solicitud registrada con exito, verifique su casilla de correo por favor' }); 
            res.status(200).redirect('/');


                    }
        });
          
}


exports.mostrarEstabl= (req, res) => {
    personalModel.buscSuc(db,(error,results) => { 

        if (error){
            console.log(error);
        } else { 
            let suc = results[0].usuSesion;  
    establecimientoModel.mostrarEstablecimiento(db,suc,function (err, datos) {
        if (err){
           console.log(error);
       } else {
        console.log(datos);
          return res.render('administrador/index', {establecimiento:datos }); 
                           }
       })

}
  }  ) } 
  
 

  exports.mostrarDatosPersonales= (req, res) => {
    personalModel.buscSuc(db,(error,results) => { 

        if (error){
            console.log(error);
        } else { 
            let suc = results[0].usuSesion;  
            console.log(suc)
    adminModel.mostrarDatosPersonales(db,suc,function (err, datos) {
        if (err){
           console.log(error);
       } else {
        console.log(datos);
        return res.render('administrador/datosPersonales', {datosPersonales:datos }); 
                           }
       }) }
  }  ) }
