export default (sequelize, DataTypes) => {
  const Sms = sequelize.define('Sms', {
    senderId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    receiverId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    messageBody: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  }, { paranoid: true });
  Sms.associate = (models) => {
    Sms.belongsTo(models.Users,
      { constraints: false });
  };
  return Sms;
};
