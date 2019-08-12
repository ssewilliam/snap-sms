require('dotenv').config();

const commonEnvOptions = {
  databaseUrl: process.env.DATABASE_URL,
  dialect: process.env.DATABASE_DIALECT || 'postgres',
  use_env_variable: 'DATABASE_URL',
};

const database = {
  production: {
    ...commonEnvOptions,
  },
  development: {
    ...commonEnvOptions,
  },
  test: {
    ...commonEnvOptions,
  },
};

module.exports = database;
