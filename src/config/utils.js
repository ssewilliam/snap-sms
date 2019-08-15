import debug from 'debug';

const logger = debug('log');

const checkVariables = (env) => {
  const unDefined = Object.keys(env).filter(
    (variable) => env[variable] === undefined,
  );

  if (!unDefined.length) return env;

  logger(`Variables "${unDefined.join(', ')}" are not in the .env`);
  return process.exit(1);
};

export default checkVariables;
