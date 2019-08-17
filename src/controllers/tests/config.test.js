import utils from '../../config/utils';

const { checkVariables } = utils;

it('should list the undefined environment variables', () => {
  process.exit = jest.fn();
  const envVariables = {
    SOME: process.env.SOME,
  };
  expect(() => {
    checkVariables(envVariables);
  }).toThrow(
    new Error(`
    \nThe following variables are required and missing in .env:
    \nSOME`),
  );
});
