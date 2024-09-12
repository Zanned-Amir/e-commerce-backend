import { check } from 'express-validator';

class ProductValidation {
  static createProduct() {
    return [
      check('name').isString().withMessage('Name is required and must be a string'),
      check('description').isString().withMessage('Description is required and must be a string'),
      check('price').isFloat({ min: 0.001 }).withMessage('Price must be greater than 0'),
      check('vat').optional()
        .isInt({ min: 0, max: 100 })
        .withMessage('VAT must be between 0 and 100'),
      check('category').isMongoId().withMessage('Category ID must be a valid ID'),
      check('provider').isMongoId().withMessage('Provider ID must be a valid ID'),
      check('images').optional()
        .isArray({ min: 1 })
        .withMessage('At least one image is required')
        .custom((value: string[]) => value.every(img => typeof img === 'string'))
        .withMessage('All images must be strings'),
      check('status').optional().isBoolean().withMessage('Status must be a boolean'),
      check('discount.value')
        .optional()
        .isFloat({ min: 0, max: 100 })
        .withMessage('Discount must be between 0 and 100'),
      check('discount.start_date').optional().isISO8601().withMessage('Start date must be a valid date'),
      check('discount.end_date').optional().isISO8601().withMessage('End date must be a valid date'),
    ];
  }

  static updateProduct() {
    return [
      check('name').optional().isString().withMessage('Name must be a string'),
      check('description').optional().isString().withMessage('Description must be a string'),
      check('price').optional().isFloat({ min: 0.001 }).withMessage('Price must be greater than 0'),
      check('vat')
        .optional()
        .isInt({ min: 0, max: 100 })
        .withMessage('VAT must be between 0 and 100'),
      check('category').optional().isMongoId().withMessage('Category ID must be a valid ID'),
      check('provider').optional().isMongoId().withMessage('Provider ID must be a valid ID'),
      check('images')
        .optional()
        .isArray()
        .withMessage('Images must be an array')
        .custom((value: string[]) => value.every(img => typeof img === 'string'))
        .withMessage('All images must be strings'),
      check('status').optional().isBoolean().withMessage('Status must be a boolean'),
      check('discount.value')
        .optional()
        .isFloat({ min: 0, max: 100 })
        .withMessage('Discount must be between 0 and 100'),
      check('discount.start_date').optional().isISO8601().withMessage('Start date must be a valid date'),
      check('discount.end_date').optional().isISO8601().withMessage('End date must be a valid date'),
    ];
  }

  static query() {
    return [
      check('name').optional().isString().withMessage('Name must be a string'),
      check('price').optional().isFloat({ min: 0.001 }).withMessage('Price must be greater than 0'),
      check('vat')
        .optional()
        .isInt({ min: 0, max: 100 })
        .withMessage('VAT must be between 0 and 100'),
      check('category').optional().isMongoId().withMessage('Category ID must be a valid ID'),
      check('provider').optional().isMongoId().withMessage('Provider ID must be a valid ID'),
      check('status').optional().isBoolean().withMessage('Status must be a boolean'),
    ];
  }

  static params() {
    return [
      check('id').isMongoId().withMessage('Invalid ID format'),
    ];
  }
}

export default ProductValidation;
