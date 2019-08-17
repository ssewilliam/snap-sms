import debug from 'debug';
import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import config from '../../config/database';
import env from '../../config/env';

const basename = path.basename(__filename);
const db = {};
const logger = debug('log');

const databaseOptions = {
  ...config[env.NODE_ENV],
  logging: env.SEQUELISE_LOGGING,
  define: {
    freezeTableName: env.NO_PLURALIZE_TABLE_NAMES,
  },
};

const sequelize = new Sequelize(
  config[env.NODE_ENV].databaseUrl,
  databaseOptions,
);

fs.readdirSync(__dirname)
  .filter(
    (file) => file.indexOf('.') !== 0
     && file !== basename && file.slice(-3) === '.js',
  )
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
logger('Database ready to recieve connection');

module.exports = db;
