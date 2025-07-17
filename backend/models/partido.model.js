module.exports = (sequelize, DataTypes) => {
  const Partido = sequelize.define("Partido", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    goles_local: { type: DataTypes.INTEGER },
    goles_visitante: { type: DataTypes.INTEGER },
    jugado: { type: DataTypes.BOOLEAN, defaultValue: false }
  }, {
    tableName: "partidos"
  });

  return Partido;
};
