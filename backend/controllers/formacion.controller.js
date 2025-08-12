const db = require('../models');
const Formacion = db.Formacion;
const Jugador = db.Jugador; 

exports.create = async (req, res) => {
  try {
    console.log('BODY RECIBIDO:', req.body);

    const { club_id, esquema, jugadores } = req.body;

    const formacion = await db.Formacion.create({ club_id, esquema, user_token: req.user_token });

    const relaciones = jugadores.map(j => ({
      formacion_id: formacion.id,
      jugador_id: j.jugador_id,
      es_titular: j.es_titular
    }));

    await db.FormacionJugador.bulkCreate(relaciones);

    res.status(201).json({ formacion });
  } catch (error) {
    console.error('ERROR AL CREAR FORMACIÓN:', error);
    res.status(500).json({ error: 'Error al crear formación' });
  }
};

exports.getJugadoresFormacion = async (req, res) => {
  try {
    const formacion = await Formacion.findByPk(req.params.id, {
      include: [{
        model: Jugador,
        as: 'jugadores',
        through: { attributes: ['es_titular'] }
      }]
    });

    if (!formacion) return res.status(404).json({ error: "Formación no encontrada" });

    res.json(formacion.jugadores);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener jugadores de la formación" });
  }
};

exports.findOne = async (req, res) => {
  try {
    const formacion = await db.Formacion.findOne({
      where: {
        id: req.params.id,
        user_token: req.user_token
      },
      include: [
        {
          model: db.Jugador,
          as: 'jugadores',
          through: { attributes: ['es_titular'] }
        }
      ]
    });

    if (!formacion) {
      return res.status(404).json({ error: 'Formación no encontrada' });
    }

    res.json({
      id: formacion.id,
      club_id: formacion.club_id,
      esquema: formacion.esquema,
      jugadores: formacion.jugadores
    });
  } catch (err) {
    console.error('Error al obtener formación:', err);
    res.status(500).json({ error: 'Error al obtener formación' });
  }
};


exports.findAll = async (req, res) => {
  try {
    const formaciones = await db.Formacion.findAll({
      where: { user_token: req.user_token },
      include: [
        {
          model: db.Jugador,
          as: 'jugadores',
          through: { attributes: ['es_titular'] }
        },
        {
          model: db.Club,
          attributes: ['nombre', 'imagen_url']
        }
      ],
      order: [['updatedAt', 'DESC']]
    });

    res.json(formaciones);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener las formaciones" });
  }
};


exports.update = async (req, res) => {
  try {
    const formacion = await db.Formacion.findOne({
      where: { id: req.params.id, user_token: req.user_token }
    });

    if (!formacion) return res.status(404).json({ error: "Formación no encontrada" });

    const { club_id, esquema, jugadores } = req.body;

    await formacion.update({ club_id, esquema });

    await db.FormacionJugador.destroy({ where: { formacion_id: formacion.id } });

    const relaciones = jugadores.map(j => ({
      formacion_id: formacion.id,
      jugador_id: j.jugador_id,
      es_titular: j.es_titular
    }));
    await db.FormacionJugador.bulkCreate(relaciones);

    res.json({ formacion });
  } catch (error) {
    console.error('Error al actualizar formación:', error);
    res.status(500).json({ error: 'Error al actualizar formación' });
  }
};

exports.delete = async (req, res) => {
  try {
    const formacion = await db.Formacion.findOne({
      where: { id: req.params.id, user_token: req.user_token }
    });

    if (!formacion) return res.status(404).json({ error: "Formación no encontrada" });

    await db.FormacionJugador.destroy({ where: { formacion_id: formacion.id } });

    await formacion.destroy();

    res.json({ mensaje: "Formación eliminada correctamente" });
  } catch (error) {
    console.error('Error al eliminar formación:', error);
    res.status(500).json({ error: 'Error al eliminar formación' });
  }
};
