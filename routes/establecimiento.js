const establController = require('../controllers/establController');

const {Router}=require('express');
const router= Router(); 


router.post('/',establController.registroEstabl);
router.post('/parametros',establController.parametros);

router.get('/',establController.mostrarEstbl);
//router.get('/personal',establController.mostrarPerso);



  
  

module.exports = router