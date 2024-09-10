import { check, param } from 'express-validator';

class OrderValidation {

  static createOrder() {
    return [
      check('user')
        .isMongoId()
        .withMessage('User ID must be a valid MongoDB ID'),
      check('address')
        .isString()
        .withMessage('Address must be a string'),
      check('products')
        .isArray({ min: 1 })
        .withMessage('Products must be an array and cannot be empty'),
      check('products.*.product')
        .isMongoId()
        .withMessage('Product ID must be a valid MongoDB ID'),
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
      check('total')
        .isFloat({ min: 0.001 })
        .withMessage('Total must be greater than 0'),
      check('status')
        .optional()
        .isIn(['pending', 'completed', 'cancelled'])
        .withMessage('Status must be pending, completed, or cancelled'),
    ];
  }

 
  static updateOrder() {
    return [
      param('id')
        .isMongoId()
        .withMessage('Order ID must be a valid MongoDB ID'),
      check('status')
        .optional()
        .isIn(['pending', 'completed', 'cancelled'])
        .withMessage('Status must be pending, completed, or cancelled'),
      check('products')
        .optional()
        .isArray()
        .withMessage('Products must be an array'),
      check('products')
          .optional()
          .isArray({ min: 1 })
          .withMessage('Products must be an array and cannot be empty'),
      check('total')
        .optional()
        .isFloat({ min: 0.001 })
        .withMessage('Total must be greater than 0'),
    ];
  }


      
       static params() {
          return [
            check('id').isMongoId().withMessage('Invalid ID format'),
          ];
        }


        static query() {
          return [
            check('status').optional().isIn(['pending', 'completed', 'cancelled']),
          ];
        }
}

export default OrderValidation;

