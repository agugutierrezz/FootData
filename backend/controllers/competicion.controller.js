const { where } = require('sequelize');
const db = require('../models');
const Competicion = db.Competicion;

exports.create = async (req, res) => {
  try {
    const nueva = await Competicion.create(req.body);
    res.status(201).json(nueva);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear competición' });
  }
};

exports.findAll = async (req, res) => {
  try {
    const todas = await Competicion.findAll();
    res.json(todas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener competiciones' });
  }
};

exports.findOne = async (req, res) => {
  try {
    const c = await Competicion.findByPk(req.params.id);
    c ? res.json(c) : res.status(404).json({ error: 'No encontrada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar competición' });
  }
};

exports.update = async (req, res) => {
  try {
    const [ok] = await Competicion.update(req.body, {
      where: { id: req.params.id }
    });
    ok
      ? res.json(await Competicion.findByPk(req.params.id))
      : res.status(404).json({ error: 'No encontrada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar competición' });
  }
};

exports.delete = async (req, res) => {
  try {
    const deleted = await Competicion.destroy({ where: { id: req.params.id } });
    deleted
      ? res.json({ mensaje: 'Competición eliminada' })
      : res.status(404).json({ error: 'No encontrada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar' });
  }
};


exports.findLigasDestacadas = async (req, res) => {
  try {
    const nombres = ["Premier League", "LaLiga", "Serie A", "Torneo Apertura", "Torneo Clausura"];
    const competiciones = await Competicion.findAll({
      where: {
        nombre: {
          [db.Sequelize.Op.in]: nombres
        }
      }
    });
    res.json(competiciones);
  } catch (error) {
    console.error('Error al obtener competiciones destacadas:', error.message);
    res.status(500).json({ error: 'Error al obtener competiciones destacadas' });
  }
};