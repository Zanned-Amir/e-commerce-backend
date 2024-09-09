import { check } from 'express-validator';

class ReviewValidation {
  // Validation for creating a review
  static createReview() {
    return [
      check('product').isMongoId().withMessage('Invalid Product ID format'),
      check('user').isMongoId().withMessage('Invalid User ID format'),
      check('review').isString().withMessage('Review must be a string').isLength({ min: 10, max: 500 }).withMessage('Review must be between 10 and 500 characters long'),
      check('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be an integer between 1 and 5'),
      check('hide').optional().isBoolean().withMessage('Hide must be a boolean'),
    ];
  }

  // Validation for updating a review
  static updateReview() {
    return [
      check('product').optional().isMongoId().withMessage('Invalid Product ID format'),
      check('user').optional().isMongoId().withMessage('Invalid User ID format'),
      check('review').optional().isString().withMessage('Review must be a string').isLength({ min: 10, max: 500 }).withMessage('Review must be between 10 and 500 characters long'),
      check('rating').optional().isInt({ min: 1, max: 5 }).withMessage('Rating must be an integer between 1 and 5'),
      check('hide').optional().isBoolean().withMessage('Hide must be a boolean'),
    ];
  }

  // Validation for query parameters
  static query() {
    return [
      check('product').optional().isMongoId().withMessage('Invalid Product ID format'),
      check('user').optional().isMongoId().withMessage('Invalid User ID format'),
      check('rating').optional().isInt({ min: 1, max: 5 }).withMessage('Rating must be an integer between 1 and 5'),
      check('hide').optional().isBoolean().withMessage('Hide must be a boolean'),
    ];
  }

  // Validation for retrieving a review by ID
  static params() {
    return [
      check('id').isMongoId().withMessage('Invalid Review ID format'),
    ];
  }
}

export default ReviewValidation;
