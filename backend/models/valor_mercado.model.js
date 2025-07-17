module.exports = (sequelize, DataTypes) => {
  const ValorMercado = sequelize.define("ValorMercado", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    fecha: { type: DataTypes.DATEONLY },
    valor: { type: DataTypes.FLOAT }
  }, {
    tableName: "valores_mercado"
  });

  return ValorMercado;
};
