import { check } from 'express-validator';

class PaymentValidation {
  static createPayment() {
    return [
      check('order').isMongoId().withMessage('Order must be a valid ID'),
      check('payment_method')
        .isIn(['credit_card', 'cash'])
        .withMessage('Payment method must be credit_card or cash'),
      check('amount')
        .isFloat({ min: 0.001 })
        .withMessage('Amount must be greater than 0'),
      check('status')
        .optional()
        .isIn(['pending', 'completed', 'cancelled'])
        .withMessage('Invalid status value'),
    ];
  }

  static updatePayment() {
    return [
      check('order').optional().isMongoId().withMessage('Order must be a valid ID'),
      check('payment_method')
        .optional()
        .isIn(['credit_card', 'cash'])
        .withMessage('Payment method must be credit_card or cash'),
      check('amount')
        .optional()
        .isFloat({ min: 0.001 })
        .withMessage('Amount must be greater than 0'),
      check('status')
        .optional()
        .isIn(['pending', 'completed', 'cancelled'])
        .withMessage('Invalid status value'),
    ];
  }

  static query() {
    return [
      check('payment_method')
        .optional()
        .isIn(['credit_card', 'cash'])
        .withMessage('Invalid payment method'),
      check('status')
        .optional()
        .isIn(['pending', 'completed', 'cancelled'])
        .withMessage('Invalid status value'),
      check('amount')
        .optional()
        .isFloat({ min: 0.001 })
        .withMessage('Amount must be greater than 0'),
    ];
  }

 

  static params() {
    return [
      check('id').isMongoId().withMessage('Invalid ID format'),
    ];
  }
}

export default PaymentValidation;
