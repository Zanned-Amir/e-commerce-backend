import { check } from 'express-validator';

class InventoryValidation {
  // Validation for creating an inventory record
  static createInventory() {
    return [
      check('product').isMongoId().withMessage('Invalid Product ID format'),
      check('label').optional().isString().withMessage('Label must be a string'),
      check('quantity').isInt({ min: 0 }).withMessage('Quantity must be a positive integer or zero'),
    ];
  }

  // Validation for updating an inventory record
  static updateInventory() {
    return [
      check('product').optional().isMongoId().withMessage('Invalid Product ID format'),
      check('label').optional().isString().withMessage('Label must be a string'),
      check('quantity').optional().isInt({ min: 0 }).withMessage('Quantity must be a positive integer or zero'),
    ];
  }

  // Validation for query parameters
  static query() {
    return [
      check('product').optional().isMongoId().withMessage('Invalid Product ID format'),
      check('label').optional().isString().withMessage('Label must be a string'),
    ];
  }

  // Validation for retrieving an inventory record by ID
  static params() {
    return [
      check('id').isMongoId().withMessage('Invalid Inventory ID format'),
    ];
  }
}

export default InventoryValidation;
