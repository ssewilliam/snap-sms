import debug from 'debug';
import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import config from '../../config/database';

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const db = {};
const logger = debug('log');

const sequelize = new Sequelize(config[env].databaseUrl, config[env]);

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
