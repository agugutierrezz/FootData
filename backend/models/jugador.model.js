module.exports = (sequelize, DataTypes) => {
  const Jugador = sequelize.define("Jugador", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    imagen_url: { type: DataTypes.STRING },
    edad: { type: DataTypes.INTEGER },
    posicion: { type: DataTypes.STRING },
    nacionalidad: { type: DataTypes.STRING },
    valor_actual: { type: DataTypes.FLOAT }
  }, {
    tableName: "jugadores"
  });

  return Jugador;
};
