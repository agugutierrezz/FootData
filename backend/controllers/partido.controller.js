const db = require('../models');
const Partido = db.Partido;

exports.create = async (req, res) => {
  try {
    const nuevo = await Partido.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear partido' });
  }
};

exports.findAll = async (req, res) => {
  try {
    const partidos = await Partido.findAll();
    res.json(partidos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener partidos' });
  }
};

exports.findOne = async (req, res) => {
  try {
    const p = await Partido.findByPk(req.params.id);
    p ? res.json(p) : res.status(404).json({ error: 'No encontrado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar partido' });
  }
};

exports.update = async (req, res) => {
  try {
    const [ok] = await Partido.update(req.body, { where: { id: req.params.id } });
    ok
      ? res.json(await Partido.findByPk(req.params.id))
      : res.status(404).json({ error: 'No encontrado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar partido' });
  }
};

exports.delete = async (req, res) => {
  try {
    const eliminado = await Partido.destroy({ where: { id: req.params.id } });
    eliminado
      ? res.json({ mensaje: 'Partido eliminado' })
      : res.status(404).json({ error: 'No encontrado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar partido' });
  }
};
