module.exports = (sequelize, DataTypes) => {
  const Formacion = sequelize.define("Formacion", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    club_id: { type: DataTypes.INTEGER, allowNull: false },
    esquema: {
      type: DataTypes.ENUM("4-4-2", "4-3-3", "3-5-2", "4-2-3-1", "5-3-2", "4-1-4-1"),
      allowNull: false
    },
    user_token: {
    type: DataTypes.STRING,
    allowNull: false
    }
  }, {
    tableName: "formaciones"
  });

  Formacion.associate = models => {
    Formacion.belongsTo(models.Club, { foreignKey: 'club_id' });
    Formacion.belongsToMany(models.Jugador, {
      through: models.FormacionJugador,
      foreignKey: 'formacion_id',
      as: 'jugadores'
    });
  };

  return Formacion;
};