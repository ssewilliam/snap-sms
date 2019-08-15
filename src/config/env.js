import dotenv from 'dotenv';
import dbConfig from './database';
import checkVariables from './utils';

dotenv.config();
const NODE_ENV = process.env.NODE_ENV || 'development';

const env = {
  DATABASE_DIALECT: dbConfig[NODE_ENV].dialect,
  DATABASE_URL: dbConfig[NODE_ENV].databaseUrl,
  use_env_variable: dbConfig[NODE_ENV].use_env_variable,
  APP_PORT: process.env.APP_PORT || '5000',
};

export default checkVariables(env);
