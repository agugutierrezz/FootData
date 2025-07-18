module.exports = (sequelize, DataTypes) => {
  const Club = sequelize.define("Club", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    imagen_url: { type: DataTypes.STRING },
    pais: { type: DataTypes.STRING },
    fundacion: { type: DataTypes.INTEGER },
    estadio: { type: DataTypes.STRING },
    liga: { type: DataTypes.STRING },
    valor_plantel: { type: DataTypes.FLOAT },
    codigo: { type: DataTypes.STRING },
    competicion_id: { type: DataTypes.INTEGER }
  }, {
    tableName: "clubes"
  });

  return Club;
};

