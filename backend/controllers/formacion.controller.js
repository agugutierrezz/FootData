const db = require('../models');
const Formacion = db.Formacion;
const Jugador = db.Jugador; 

exports.create = async (req, res) => {
  try {
    console.log('BODY RECIBIDO:', req.body);

    const { club_id, esquema, jugadores } = req.body;

    const formacion = await db.Formacion.create({ club_id, esquema });

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