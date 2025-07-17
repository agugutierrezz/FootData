const db = require('../models');
const Fecha = db.Fecha;

exports.create = async (req, res) => {
  try {
    const nueva = await Fecha.create(req.body);
    res.status(201).json(nueva);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear fecha' });
  }
};

exports.findAll = async (req, res) => {
  try {
    const todas = await Fecha.findAll();
    res.json(todas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener fechas' });
  }
};

exports.findOne = async (req, res) => {
  try {
    const f = await Fecha.findByPk(req.params.id);
    f ? res.json(f) : res.status(404).json({ error: 'No encontrada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar fecha' });
  }
};

exports.update = async (req, res) => {
  try {
    const [ok] = await Fecha.update(req.body, {
      where: { id: req.params.id }
    });
    ok
      ? res.json(await Fecha.findByPk(req.params.id))
      : res.status(404).json({ error: 'No encontrada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar fecha' });
  }
};

exports.delete = async (req, res) => {
  try {
    const deleted = await Fecha.destroy({ where: { id: req.params.id } });
    deleted
      ? res.json({ mensaje: 'Fecha eliminada' })
      : res.status(404).json({ error: 'No encontrada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar' });
  }
};
