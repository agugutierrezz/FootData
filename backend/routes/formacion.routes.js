const router = require('express').Router();
const controller = require('../controllers/formacion.controller');

router.post('/', controller.create);
router.get('/:id', controller.findOne);
router.get('/:id/jugadores', controller.getJugadoresFormacion);
router.get('/', controller.findAll);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);



module.exports = router;


