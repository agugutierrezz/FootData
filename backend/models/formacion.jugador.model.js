module.exports = (sequelize, DataTypes) => {
  const FormacionJugador = sequelize.define('FormacionJugador', {
    formacion_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    jugador_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    es_titular: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    }
  }, {
    tableName: 'formaciones_jugadores',
    timestamps: false
  });

  return FormacionJugador;
};
