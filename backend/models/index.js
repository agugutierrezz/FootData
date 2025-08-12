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
db.JugadorDatoExtra = require("./jugador.dato.extra")(sequelize, DataTypes);
db.Competicion = require('./competicion.model')(sequelize, DataTypes);
db.Partido = require('./partido.model')(sequelize, DataTypes);
db.Formacion = require('./formacion.model')(sequelize, DataTypes);
db.FormacionJugador = require('./formacion.jugador.model')(sequelize, DataTypes);
db.ClubCompeticion = require('./club.competicion')(sequelize, DataTypes);

// --------------------- ASOCIACIONES ---------------------

// Club tiene muchos Jugadores
db.Club.hasMany(db.Jugador, { foreignKey: 'club_id', as: 'jugadores' });
db.Jugador.belongsTo(db.Club, { foreignKey: 'club_id', as: 'club' });

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

// Asociación uno a muchos entre Jugador y JugadorDatoExtra
db.JugadorDatoExtra.associate = function(models) {
  db.JugadorDatoExtra.belongsTo(models.Jugador, {
    foreignKey: 'jugador_id',
    as: 'jugador'
  });
};

// Asociación muchos a muchos entre Club y Competicion
db.Club.belongsToMany(db.Competicion, {
  through: db.ClubCompeticion,
  foreignKey: 'club_id',
  otherKey: 'competicion_id'
});

db.Competicion.belongsToMany(db.Club, {
  through: db.ClubCompeticion,
  foreignKey: 'competicion_id',
  otherKey: 'club_id'
});

// Formacion pertenece a un Club
db.Formacion.belongsTo(db.Club, { foreignKey: 'club_id' });


module.exports = db;