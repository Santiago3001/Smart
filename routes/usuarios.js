const usuariosController = require('../controllers/usuariosController');

const {Router}=require('express');
const router= Router(); 


//url de pagina de inicio

router.post('/login', usuariosController.login);

module.exports = router