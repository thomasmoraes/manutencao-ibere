module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    email: {
      type: DataTypes.STRING,
      AllowNull: false
    }
  },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: 'User'
    });
  return User;
};
