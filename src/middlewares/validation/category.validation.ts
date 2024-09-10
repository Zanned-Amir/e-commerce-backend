import { check } from 'express-validator';

class CategoryValidation {
  // Validation for creating a category
  static createCategory() {
    return [
      check('name').isString().withMessage('Category name must be a string'),
      check('description').optional().isString().withMessage('Description must be a string'),
    ];
  }

  
  static updateCategory() {
    return [
      check('name').optional().isString().withMessage('Category name must be a string'),
      check('description').optional().isString().withMessage('Description must be a string'),
    ];
  }

 
  static query() {
    return [
      check('name').optional().isString().withMessage('Category name must be a string'),
    ];
  }


  static params() {
    return [
      check('id').isMongoId().withMessage('Invalid Category ID format'),
    ];
  }
}

export default CategoryValidation;
