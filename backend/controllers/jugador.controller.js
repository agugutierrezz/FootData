const db = require('../models');
const Jugador = db.Jugador;

exports.create = async (req, res) => {
  try {
    const nuevo = await Jugador.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear jugador' });
  }
};

exports.findAll = async (req, res) => {
  try {
    const jugadores = await Jugador.findAll();
    res.json(jugadores);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener jugadores' });
  }
};

exports.findOne = async (req, res) => {
  try {
    const jugador = await Jugador.findByPk(req.params.id);
    jugador ? res.json(jugador) : res.status(404).json({ error: 'No encontrado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar jugador' });
  }
};

exports.update = async (req, res) => {
  try {
    const [ok] = await Jugador.update(req.body, { where: { id: req.params.id } });
    ok
      ? res.json(await Jugador.findByPk(req.params.id))
      : res.status(404).json({ error: 'No encontrado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar jugador' });
  }
};

exports.delete = async (req, res) => {
  try {
    const eliminado = await Jugador.destroy({ where: { id: req.params.id } });
    eliminado
      ? res.json({ mensaje: 'Jugador eliminado' })
      : res.status(404).json({ error: 'No encontrado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar jugador' });
  }
};

const Club = db.Club;

exports.findMasCaros = async (req, res) => {
  try {
    const jugadores = await Jugador.findAll({
      where: {
        valor_mercado: {
          [db.Sequelize.Op.not]: null
        }
      },
      order: [['valor_mercado', 'DESC']],
      limit: 10,
      include: [{ model: db.Club, attributes: ['nombre', 'imagen_url'] }],
    });

    res.json(jugadores);
  } catch (error) {
    console.error('Error al obtener jugadores más caros:', error.message);
    res.status(500).json({ error: 'Error al obtener jugadores más caros' });
  }
};


