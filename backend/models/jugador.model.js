module.exports = (sequelize, DataTypes) => {
  const Jugador = sequelize.define("Jugador", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    imagen_url: { type: DataTypes.STRING },
    posicion: { type: DataTypes.STRING },
    fecha_nacimiento: { type: DataTypes.DATE },
    edad: { type: DataTypes.INTEGER },
    posicion: { type: DataTypes.STRING },
    nacionalidades: { type: DataTypes.ARRAY(DataTypes.STRING) },
    altura: { type: DataTypes.INTEGER },
    pie: { type: DataTypes.STRING },
    contrato: { type: DataTypes.DATE },
    valor_mercado: { type: DataTypes.FLOAT },
    club_id: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: "jugadores"
  });

  Jugador.associate = models => {
    Jugador.belongsToMany(models.Formacion, {
      through: models.FormacionJugador,
      foreignKey: 'jugador_id',
      as: 'formaciones'
    });
  };

  return Jugador;
};

