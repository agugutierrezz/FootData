const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('../config/db.config');
require('dotenv').config();

const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.DIALECT,
    port: dbConfig.PORT,
    logging: false,
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importar modelos
db.Club = require('./club.model')(sequelize, DataTypes);
db.Jugador = require('./jugador.model')(sequelize, DataTypes);
db.Competicion = require('./competicion.model')(sequelize, DataTypes);
db.Partido = require('./partido.model')(sequelize, DataTypes);
db.Formacion = require('./formacion.model')(sequelize, DataTypes);
db.FormacionJugador = require('./formacion.jugador.model')(sequelize, DataTypes);

// --------------------- ASOCIACIONES ---------------------

// Club tiene muchos Jugadores (actuales)
db.Club.hasMany(db.Jugador, { foreignKey: 'club_actual_id' });
db.Jugador.belongsTo(db.Club, { foreignKey: 'club_actual_id' });


// Relación muchos a muchos entre Club y Competición
db.Club.belongsToMany(db.Competicion, {
  through: 'ClubCompeticion',
  foreignKey: 'club_id',
  otherKey: 'competicion_id',
});
db.Competicion.belongsToMany(db.Club, {
  through: 'ClubCompeticion',
  foreignKey: 'competicion_id',
  otherKey: 'club_id',
});

// Asociación muchos a muchos entre Formacion y Jugador
db.Formacion.belongsToMany(db.Jugador, {
  through: db.FormacionJugador,
  foreignKey: 'formacion_id',
  as: 'jugadores'
});

db.Jugador.belongsToMany(db.Formacion, {
  through: db.FormacionJugador,
  foreignKey: 'jugador_id',
  as: 'formaciones'
});

module.exports = db;