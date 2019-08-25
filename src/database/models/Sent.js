
module.exports = (sequelize, DataTypes) => {
  const Sent = sequelize.define('Sent', {
    userId: DataTypes.INTEGER,
    receiverId: DataTypes.INTEGER,
    smsId: DataTypes.INTEGER,
  }, {});
  Sent.associate = (models) => {
    Sent.belongsTo(models.Users);
  };
  return Sent;
};
