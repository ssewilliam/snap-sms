import dotenv from 'dotenv';
import dbConfig from './database';
import utils from './utils';

dotenv.config();
const { NODE_ENV } = process.env;

const { checkVariables, getExactBoolean } = utils;

const env = {
  DATABASE_DIALECT: dbConfig[NODE_ENV].dialect,
  DATABASE_URL: dbConfig[NODE_ENV].databaseUrl,
  use_env_variable: dbConfig[NODE_ENV].use_env_variable,
  APP_PORT: process.env.PORT,
  NODE_ENV,
  SEQUELISE_LOGGING: getExactBoolean(process.env.SEQUELISE_LOGGING),
  NO_PLURALIZE_TABLE_NAMES: getExactBoolean(
    process.env.NO_PLURALIZE_TABLE_NAMES,
  ),
};

export default checkVariables(env);
