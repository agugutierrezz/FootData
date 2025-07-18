module.exports = (sequelize, DataTypes) => {
  const Competicion = sequelize.define("Competicion", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING },
    imagen_url: { type: DataTypes.STRING },
    codigo: { type: DataTypes.STRING },         
    continente: { type: DataTypes.STRING },     
    tipo: { type: DataTypes.STRING },           
    pais: { type: DataTypes.STRING },
    temporada: { type: DataTypes.STRING }
  }, {
    tableName: "competiciones"
  });

  return Competicion;
};
