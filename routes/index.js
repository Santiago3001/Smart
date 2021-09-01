var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/',(req,res) => {
  res.render('index');
});

router.get('/register', (req, res)=> {
  res.render('register');
});

router.get('/login', (req, res)=> {
  res.render('login');
});

router.get('/administrador/establecimiento',(req,res)=>{
   res.render('administrador/establecimiento');
});

router.get('/regpersonal', (req,res)=>{
  res.render('administrador/gestionPersonal')});

/*
router.get('/administrador/index',(req,res)=>{
  res.render('administrador/index');
}); 
*/

 router.get('/administrador/personal',(req,res)=>{
  res.render('administrador/gestionPersonal');
}); 

/*Rutas de las vistas Personal de Seguridad */
router.get('/seguridad/index', (req, res)=> {
  res.render('seguridad/index');
});

router.get('/seguridad/asistencia', (req, res)=> {
  res.render('seguridad/asistencia');
});

router.get('/seguridad/datosPersonales',(req,res)=>{
  res.render('seguridad/datosPersonales');
});
/*Rutas de las vistas de Rerportes */

/* router.get('/verificar', (req, res)=> {
  res.render('reportes/verificacion');
});

router.get('/reportes/reporte',(req, res)=> {
  res.render('reportes/reporte');
}); */








module.exports = router;