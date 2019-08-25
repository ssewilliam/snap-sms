import { body, validationResult, param } from 'express-validator';

const verifyValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  return next();
};

exports.validateRequest = [
  body('userId')
    .exists()
    .isNumeric()
    .withMessage('userId of sender must be a number')
    .trim(),
  body('receiverId')
    .exists()
    .isNumeric()
    .withMessage('receiver id must be a number')
    .trim(),
  body('messageBody')
    .exists()
    .isString()
    .withMessage('message body must be a string')
    .isLength({ min: 5 })
    .withMessage('message body must atleast six characheters long'),
  verifyValidation,
];
exports.validatePhoneNumber = [
  body('phoneNumber')
    .exists()
    .withMessage('phoneNumber has not been defined')
    .isNumeric()
    .withMessage('Number entered is not a valid phoneNumber')
    .trim(),
  verifyValidation,
];
exports.validateParamPhoneNumber = [
  param('phoneNumber')
    .exists()
    .withMessage('phoneNumber has not been defined in the url path')
    .isNumeric()
    .withMessage('Number entered is not a valid phoneNumber')
    .trim(),
  verifyValidation,
];
exports.validateUser = [
  body('firstName')
    .exists()
    .withMessage('firstName has not been defined')
    .isString()
    .withMessage('firstName entered is not a valid string')
    .trim(),
  body('lastName')
    .exists()
    .withMessage('lastName has not been defined')
    .isString()
    .withMessage('lastName entered is not a valid string')
    .trim(),
  body('imageField')
    .exists()
    .withMessage('imageField url has not been defined')
    .isURL()
    .withMessage('imageField URL is not valid')
    .trim(),
  verifyValidation,
];
