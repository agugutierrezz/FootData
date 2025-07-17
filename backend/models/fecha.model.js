module.exports = (sequelize, DataTypes) => {
  const Fecha = sequelize.define("Fecha", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    numero_fecha: { type: DataTypes.INTEGER },
    fecha_real: { type: DataTypes.DATEONLY }
  }, {
    tableName: "fechas"
  });

  return Fecha;
};
