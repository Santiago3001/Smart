
const {Router}=require('express');
const router= Router(); 
const visitanteController = require('../controllers/visitanteController');

router.post('/regVisitante', visitanteController.regVisit);

router.post('/regAsist', visitanteController.regAsistencia);

router.post('/regSal', visitanteController.regSalida);

module.exports = router;