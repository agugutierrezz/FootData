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
db.ValorMercado = require('./valor_mercado.model')(sequelize, DataTypes);
db.HistorialClubJugador = require('./historial_club_jugador.model')(sequelize, DataTypes);
db.Competicion = require('./competicion.model')(sequelize, DataTypes);
db.Fecha = require('./fecha.model')(sequelize, DataTypes);
db.Partido = require('./partido.model')(sequelize, DataTypes);
db.Formacion = require('./formacion.model')(sequelize, DataTypes);

// --------------------- ASOCIACIONES ---------------------

// Club tiene muchos Jugadores (actuales)
db.Club.hasMany(db.Jugador, { foreignKey: 'club_actual_id' });
db.Jugador.belongsTo(db.Club, { foreignKey: 'club_actual_id' });

// Jugador tiene muchos valores de mercado
db.Jugador.hasMany(db.ValorMercado, { foreignKey: 'jugador_id' });
db.ValorMercado.belongsTo(db.Jugador, { foreignKey: 'jugador_id' });

// Historial de clubes de un jugador
db.Jugador.hasMany(db.HistorialClubJugador, { foreignKey: 'jugador_id' });
db.Club.hasMany(db.HistorialClubJugador, { foreignKey: 'club_id' });
db.HistorialClubJugador.belongsTo(db.Jugador, { foreignKey: 'jugador_id' });
db.HistorialClubJugador.belongsTo(db.Club, { foreignKey: 'club_id' });

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

// Competición tiene muchas Fechas
db.Competicion.hasMany(db.Fecha, { foreignKey: 'competicion_id' });
db.Fecha.belongsTo(db.Competicion, { foreignKey: 'competicion_id' });

// Fecha tiene muchos Partidos
db.Fecha.hasMany(db.Partido, { foreignKey: 'fecha_id' });
db.Partido.belongsTo(db.Fecha, { foreignKey: 'fecha_id' });

// Partido tiene Club local y visitante
db.Club.hasMany(db.Partido, { foreignKey: 'club_local_id', as: 'PartidosLocal' });
db.Club.hasMany(db.Partido, { foreignKey: 'club_visitante_id', as: 'PartidosVisitante' });
db.Partido.belongsTo(db.Club, { foreignKey: 'club_local_id', as: 'ClubLocal' });
db.Partido.belongsTo(db.Club, { foreignKey: 'club_visitante_id', as: 'ClubVisitante' });

// Relación muchos a muchos entre Formacion y Jugadores
db.Formacion.belongsToMany(db.Jugador, {
  through: 'FormacionJugador',
  foreignKey: 'formacion_id',
  otherKey: 'jugador_id',
});
db.Jugador.belongsToMany(db.Formacion, {
  through: 'FormacionJugador',
  foreignKey: 'jugador_id',
  otherKey: 'formacion_id',
});

// Formacion pertenece a un Club
db.Formacion.belongsTo(db.Club, { foreignKey: 'club_id' });
db.Club.hasMany(db.Formacion, { foreignKey: 'club_id' });

module.exports = db;