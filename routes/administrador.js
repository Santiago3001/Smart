const adminController = require('../controllers/adminController');

const {Router}=require('express');
const usuariosController = require('../controllers/usuariosController');
const router= Router(); 


//url de pagina de inicio
router.post('/register', adminController.register);
router.post('/login', adminController.login);
router.get('/',adminController.mostrarEstabl);

//router.post('/regpersonal', adminController.regPersonal);
//router.post('/regpersonalSeg', adminController.regSeguridad);
//router.get('/regpersonal', (req,res)=>{res.render('administrador/gestionPersonal')})
// router.post('/registroEstablecimiento',adminController.registroEstablecimiento);

router.get('/datosPersonales',adminController.mostrarDatosPersonales);

module.exports = router