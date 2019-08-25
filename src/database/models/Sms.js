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
      type: DataTypes.INTEGER,
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
  Sms.addHook('afterCreate', (sms) => {
    sequelize.models.Inbox.create({
      ...sms.dataValues,
      userId: sms.dataValues.receiverId,
      smsId: sms.dataValues.id,
    });
    sequelize.models.Sent.create({
      ...sms.dataValues,
      userId: sms.dataValues.senderId,
      smsId: sms.dataValues.id,
    });
  });
  return Sms;
};
