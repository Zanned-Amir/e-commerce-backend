import { check } from 'express-validator';

class OrderValidation {
  static createOrder() {
    return [
      check('user').isMongoId().withMessage('User must be a valid ID'),
      check('address').isString().withMessage('Address must be a string'),
      check('products')
        .isArray({ min: 1 })
        .withMessage('Products must be an array with at least one item'),
      check('products.*.product').isMongoId().withMessage('Product ID must be a valid ID'),
      check('products.*.quantity')
        .isInt({ min: 1, max: 100 })
        .withMessage('Quantity must be between 1 and 100'),
      check('products.*.price')
        .isFloat({ min: 0.001 })
        .withMessage('Price must be greater than 0'),
      check('products.*.discount')
        .optional()
        .isFloat({ min: 0, max: 100 })
        .withMessage('Discount must be between 0 and 100'),
      check('total').isFloat({ min: 0.001 }).withMessage('Total must be greater than 0'),
      check('status').optional().isIn(['pending', 'completed', 'cancelled']).withMessage('Invalid status value'),
    ];
  }

  static updateOrder() {
    return [
      check('user').optional().isMongoId().withMessage('User must be a valid ID'),
      check('address').optional().isString().withMessage('Address must be a string'),
      check('products').optional().isArray().withMessage('Products must be an array'),
      check('products.*.product').optional().isMongoId().withMessage('Product ID must be valid'),
      check('products.*.quantity')
        .optional()
        .isInt({ min: 1, max: 100 })
        .withMessage('Quantity must be between 1 and 100'),
      check('products.*.price')
        .optional()
        .isFloat({ min: 0.001 })
        .withMessage('Price must be greater than 0'),
      check('products.*.discount')
        .optional()
        .isFloat({ min: 0, max: 100 })
        .withMessage('Discount must be between 0 and 100'),
      check('total').optional().isFloat({ min: 0.001 }).withMessage('Total must be greater than 0'),
      check('status').optional().isIn(['pending', 'completed', 'cancelled']).withMessage('Invalid status value'),
    ];
  }

  static query() {
    return [
      check('user').optional().isMongoId().withMessage('User must be a valid ID'),
      check('status').optional().isIn(['pending', 'completed', 'cancelled']).withMessage('Invalid status value'),
      check('total').optional().isFloat({ min: 0.001 }).withMessage('Total must be greater than 0'),
    ];
  }



  static params() {
    return [
      check('id').isMongoId().withMessage('Invalid ID format'),
    ];
  }
}

export default OrderValidation;
