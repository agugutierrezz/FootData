module.exports = (sequelize, DataTypes) => {
  return sequelize.define('ClubCompeticion', {
    club_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    competicion_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'ClubCompeticion',
    timestamps: true
  });
};

