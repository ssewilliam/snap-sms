import debug from 'debug';

const logger = debug('log');

const getExactBoolean = (value) => {
  const boolean = /^(?:f(?:alse)?|no?|0+)$/i;
  return !boolean.test(value) && !!value;
};

const checkVariables = (env) => {
  const unDefined = Object.keys(env).filter(
    (variable) => env[variable] === undefined,
  );

  if (!unDefined.length) return env;

  logger(`Variables "${unDefined.join(', ')}" are not in the .env`);
  throw new Error(`
    \nThe following variables are required and missing in .env:
    \n${unDefined.join('\n')}`);
};

const utils = {
  getExactBoolean,
  checkVariables,
};
export default utils;
