const db = require('../models');
const Club = db.Club;

// Crear un nuevo club
exports.createClub = async (req, res) => {
  try {
    const nuevoClub = await Club.create(req.body);
    res.status(201).json(nuevoClub);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el club', detalle: error.message });
  }
};

// Obtener todos los clubes
exports.getClubs = async (req, res) => {
  try {
    const clubes = await Club.findAll();
    res.json(clubes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los clubes' });
  }
};

// Obtener club por ID
exports.getClubById = async (req, res) => {
  try {
    const club = await Club.findByPk(req.params.id);
    if (club) res.json(club);
    else res.status(404).json({ error: 'Club no encontrado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar el club' });
  }
};

// Actualizar club
exports.updateClub = async (req, res) => {
  try {
    const [actualizado] = await Club.update(req.body, {
      where: { id: req.params.id }
    });
    if (actualizado) {
      const clubActualizado = await Club.findByPk(req.params.id);
      res.json(clubActualizado);
    } else {
      res.status(404).json({ error: 'Club no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el club' });
  }
};

// Eliminar club
exports.deleteClub = async (req, res) => {
  try {
    const eliminado = await Club.destroy({
      where: { id: req.params.id }
    });
    if (eliminado) res.json({ mensaje: 'Club eliminado correctamente' });
    else res.status(404).json({ error: 'Club no encontrado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el club' });
  }
};


exports.findClubesDestacados = async (req, res) => {
  try {
    const nombres = [
      "Real Madrid", "FC Barcelona", "Liverpool FC", "Manchester City", "Chelsea FC", "Arsenal FC", 
      "Bayern Munich", "Paris Saint-Germain", "CA Boca Juniors", "CA River Plate", "Club Estudiantes de La Plata", "Club de Gimnasia y Esgrima La Plata"];
    const clubes = await Club.findAll({
      where: {
        nombre: {
          [db.Sequelize.Op.in]: nombres
        }
      }
    });
    res.json(clubes);
  } catch (error) {
    console.error('Error al obtener clubes destacados:', error.message);
    res.status(500).json({ error: 'Error al obtener clubes destacados' });
  }
};

exports.getFormacionesByClub = async (req, res) => {
  try {
    const formaciones = await db.Formacion.findAll({
      where: { club_id: req.params.id },
      order: [['createdAt', 'ASC']]
    });
    res.json(formaciones);
  } catch (error) {
    console.error("Error al obtener formaciones del club", error);
    res.status(500).json({ error: "Error al obtener formaciones del club" });
  }
};