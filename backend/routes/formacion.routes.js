const router = require('express').Router();
const controller = require('../controllers/formacion.controller');

router.post('/', controller.create);
router.get('/:id/jugadores', controller.getJugadoresFormacion);

module.exports = router;


