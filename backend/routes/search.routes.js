const router = require('express').Router();
const db = require('../models');

router.get('/', async (req, res) => {
  const query = req.query.q;

  if (!query || query.length < 3) return res.json({ clubes: [], jugadores: [], competiciones: [] });

  const Op = require('sequelize').Op;

  const [clubes, jugadores, competiciones] = await Promise.all([
    db.Club.findAll({
      where: { nombre: { [Op.iLike]: `%${query}%` } },
      attributes: ['id', 'nombre', 'imagen_url'],
      limit: 5
    }),
    db.Jugador.findAll({
      where: { nombre: { [Op.iLike]: `%${query}%` } },
      attributes: ['id', 'nombre', 'imagen_url'],
      order: [db.Sequelize.literal('"valor_mercado" IS NULL'), ['valor_mercado', 'DESC']],
      limit: 5
    }),
    db.Competicion.findAll({
      where: { nombre: { [Op.iLike]: `%${query}%` } },
      attributes: ['id', 'nombre', 'imagen_url'],
      limit: 5
    }),
  ]);
  
  res.json({ clubes, jugadores, competiciones });
});

module.exports = router;
