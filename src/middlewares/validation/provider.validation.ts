import { check } from 'express-validator';
import Validator from 'validator';

class ProviderValidation {
  static createProvider() {
    return [
      check('name').isString().withMessage('Name must be a string'),
      check('type')
        .isIn(['company', 'individual'])
        .withMessage('Type must be either company or individual'),
      check('contactInfo.email')
        .optional()
        .isEmail()
        .withMessage('Please provide a valid email'),
      check('contactInfo.phone')
        .isString()
        .withMessage('Phone number is required and must be a string'),
      check('address').optional().isString().withMessage('Address must be a string'),
      check('link')
        .optional()
        .custom((value) => (value ? Validator.isURL(value) : true))
        .withMessage('Invalid URL format'),
    ];
  }

  static updateProvider() {
    return [
      check('name').optional().isString().withMessage('Name must be a string'),
      check('type')
        .optional()
        .isIn(['company', 'individual'])
        .withMessage('Type must be either company or individual'),
      check('contactInfo.email')
        .optional()
        .isEmail()
        .withMessage('Please provide a valid email'),
      check('contactInfo.phone')
        .optional()
        .isString()
        .withMessage('Phone number must be a string'),
      check('address').optional().isString().withMessage('Address must be a string'),
      check('link')
        .optional()
        .custom((value) => (value ? Validator.isURL(value) : true))
        .withMessage('Invalid URL format'),
    ];
  }

  static query() {
    return [
      check('name').optional().isString().withMessage('Name must be a string'),
      check('type')
        .optional()
        .isIn(['company', 'individual'])
        .withMessage('Invalid type value'),
      check('contactInfo.email')
        .optional()
        .isEmail()
        .withMessage('Invalid email format'),
      check('contactInfo.phone')
        .optional()
        .isString()
        .withMessage('Phone number must be a string'),
      check('link')
        .optional()
        .custom((value) => (value ? Validator.isURL(value) : true))
        .withMessage('Invalid URL format'),
    ];
  }

  static get() {
    return [
      check('id').isMongoId().withMessage('Provider ID must be a valid ID'),
    ];
  }

  static params() {
    return [
      check('id').isMongoId().withMessage('Invalid ID format'),
    ];
  }
}

export default ProviderValidation;
