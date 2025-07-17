module.exports = (sequelize, DataTypes) => {
  const HistorialClubJugador = sequelize.define("HistorialClubJugador", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    fecha_inicio: { type: DataTypes.DATEONLY },
    fecha_fin: { type: DataTypes.DATEONLY },
    transferencia_monto: { type: DataTypes.FLOAT }
  }, {
    tableName: "historiales_club_jugador"
  });

  return HistorialClubJugador;
};
