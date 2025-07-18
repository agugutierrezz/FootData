const router = require('express').Router();
const controller = require('../controllers/competicion.controller');

router.post('/', controller.create);
router.get('/', controller.findAll);
router.get('/ligas-destacadas', controller.findLigasDestacadas);
router.get('/:id', controller.findOne);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
