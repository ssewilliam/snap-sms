
module.exports = (sequelize, DataTypes) => {
  const Inbox = sequelize.define('Inbox', {
    senderId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    smsId: DataTypes.INTEGER,
  }, {});
  Inbox.associate = (models) => {
    Inbox.belongsTo(models.Users);
  };
  return Inbox;
};
