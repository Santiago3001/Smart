
const {Router}=require('express');
const router= Router(); 
const personalController = require('../controllers/personalController');

router.post('/regPersonal', personalController.regPersonal);

router.get('/mostrarPersonal',personalController.mostrarPerso);


module.exports = router;