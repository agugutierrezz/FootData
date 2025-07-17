module.exports = (sequelize, DataTypes) => {
  const Formacion = sequelize.define("Formacion", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING },
    fecha_creacion: { type: DataTypes.DATEONLY }
  }, {
    tableName: "formaciones"
  });

  return Formacion;
};
