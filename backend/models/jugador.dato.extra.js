module.exports = (sequelize, DataTypes) => {
  const JugadorDatoExtra = sequelize.define('JugadorDatoExtra', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    jugador_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'jugadores', key: 'id' }
    },
    tipo: {
      type: DataTypes.STRING, // ej: "transferencias", "logros", "valor_mercado"
      allowNull: false
    },
    datos: {
      type: DataTypes.JSONB,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'jugador_dato_extra'
  });

  JugadorDatoExtra.associate = models => {
    JugadorDatoExtra.belongsTo(models.Jugador, {
      foreignKey: 'jugador_id',
      as: 'jugador'
    });
  };

  return JugadorDatoExtra;
};
