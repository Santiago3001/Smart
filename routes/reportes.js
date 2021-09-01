const reporteController = require('../controllers/reporteController');

const {Router}=require('express');
const router= Router(); 

var multer = require('multer');
var fecha = Date.now();

var rutaAlmacenar = multer.diskStorage({
 destination: function(req,file,callback){
    callback(null,'testpositivo');
    console.log(callback);
 },
filename:function (req,file,callback){
    console.log(file);
    callback(null,fecha+"_"+file.originalname);
}
});

var cargar = multer ({storage:rutaAlmacenar});
//url de pagina de inicio

router.post('/verificar', reporteController.verificacion);

router.get('/reporte',(req, res)=> {
  res.render('reportes/reporte');
  //res.status(200).redirect('/reportes/verificacion');
});
router.get('/verificar', (req, res)=> {
  res.render('reportes/verificacion');
  //res.status(200).redirect('/reportes/verificacion');
});

router.post('/reporte',cargar.single("archivoTest"),reporteController.guardar);

router.get('/positivos',reporteController.mostrarRepo);

router.post('/validar',reporteController.validarRepo);
/* router.get('/positivos', (req, res)=> {
  res.render('administrador/reportesPositivos');
}); */

module.exports = router