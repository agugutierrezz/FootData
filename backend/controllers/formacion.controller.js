const db = require('../models');
const Formacion = db.Formacion;

exports.create = async (req, res) => {
  try {
    const nueva = await Formacion.create(req.body);
    res.status(201).json(nueva);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear formación' });
  }
};

exports.findAll = async (req, res) => {
  try {
    const todas = await Formacion.findAll();
    res.json(todas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener formaciones' });
  }
};

exports.findOne = async (req, res) => {
  try {
    const f = await Formacion.findByPk(req.params.id);
    f ? res.json(f) : res.status(404).json({ error: 'No encontrada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar formación' });
  }
};

exports.update = async (req, res) => {
  try {
    const [ok] = await Formacion.update(req.body, {
      where: { id: req.params.id }
    });
    ok
      ? res.json(await Formacion.findByPk(req.params.id))
      : res.status(404).json({ error: 'No encontrada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar formación' });
  }
};

exports.delete = async (req, res) => {
  try {
    const deleted = await Formacion.destroy({ where: { id: req.params.id } });
    deleted
      ? res.json({ mensaje: 'Formación eliminada' })
      : res.status(404).json({ error: 'No encontrada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar' });
  }
};
