import { check } from 'express-validator';

class UserValidation {
  static createUser() {
    return [
      check('username').isString().withMessage('Username must be a string'),
      check('email').isEmail().withMessage('Please provide a valid email'),
      check('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
      check('avatar').optional().isString(),
      check('role').optional().isIn(['user', 'admin']),
      check('status').optional().isIn(['active', 'inactive', 'banned']),
      check('phone_number').optional().isMobilePhone("ar-TN").withMessage('Please provide a valid phone number'),
      check('address').optional().isArray().withMessage('Address must be an array of objects'),
    ];
  }

  static updateUser() {
    return [
      check('username').optional().isString().withMessage('Username must be a string'),
      check('email').optional().isEmail().withMessage('Please provide a valid email'),
      check('password').optional().isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
      check('avatar').optional().isString(),
      check('role').optional().isIn(['user', 'admin']),
      check('status').optional().isIn(['active', 'inactive', 'banned']),
      check('phone_number').optional().isMobilePhone("ar-TN").withMessage('Please provide a valid phone number'),
      check('address').optional().isArray().withMessage('Address must be an array of objects'),
    ];
  }

  static query() {
    return [
      check('name').optional().isString(),
      check('email').optional().isEmail(),
      check('role').optional().isString(),
      check('status').optional().isIn(['active', 'inactive', 'banned']),
    ];
  }

  static params() {
    return [
      check('id').isMongoId().withMessage('Invalid ID format'),
    ];
  }
}

export default UserValidation;
