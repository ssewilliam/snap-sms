
// chaining migration files
module.exports = {
  up: async (queryInterface, DataTypes) => [
    await queryInterface.addColumn('Sms',
      'messageTypeSender', {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: 'sent',
      }),
    await queryInterface.addColumn('Sms',
      'messageTypeReceiver', {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: 'inbox',
      }),
  ],

  down: async (queryInterface) => [
    await queryInterface.removeColumn('Sms', 'messageTypeSender'),
    await queryInterface.removeColumn('Sms', 'messageTypeReceiver'),
  ],
};
