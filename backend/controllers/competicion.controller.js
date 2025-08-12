const { where } = require('sequelize');
const db = require('../models');
const Competicion = db.Competicion;
const Club = db.Club

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
    const nombres = ["Premier League", "LaLiga", "Serie A", "Bundesliga", "Ligue 1", "Torneo Clausura"];
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

exports.findClubesByCompeticion = async (req, res) => {
  try {
    const { id } = req.params;

    const competicion = await Competicion.findByPk(id, {
      include: {
        model: Club,
        through: { attributes: [] }
      }
    });

    if (!competicion) {
      return res.status(404).json({ message: 'Competición no encontrada' });
    }

    const clubesOrdenados = competicion.Clubs.sort(
      (a, b) => (b.valor_plantel || 0) - (a.valor_plantel || 0)
    );

    res.json(clubesOrdenados);
  } catch (error) {
    console.error('Error al buscar clubes por competición:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

