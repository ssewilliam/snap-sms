import { body, validationResult } from 'express-validator';

const verifyValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  return next();
};

exports.validateRequest = [
  body('senderId')
    .exists()
    .isNumeric()
    .withMessage('sender id must be a number')
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
exports.validateEmail = [
  body('email')
    .exists()
    .withMessage('Email has not been defined')
    .isEmail()
    .withMessage('Email entered is not a valid email')
    .trim(),
  verifyValidation,
];
