const router = require('express').Router();
const controller = require('../controllers/jugador.controller');

router.post('/', controller.create);
router.get('/', controller.findAll);
router.get('/mas-caros', controller.findMasCaros);
router.get('/:id/perfil', controller.findPerfilExtendido);
router.get('/por-club/:clubId', controller.findByClub);
router.get('/:id', controller.findOne);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
