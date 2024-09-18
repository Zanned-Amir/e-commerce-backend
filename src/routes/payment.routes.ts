import  { Router } from 'express';
import { PaymentController } from '../controllers/index';

import { PaymentValidation , handleValidation } from '../middlewares/index';
import { Authenticated } from '../middlewares/index';
import authorize from '../middlewares/authorize';


const router = Router();

const paymentController = new PaymentController();

const authenticated = new Authenticated();

router.route('/')
  .get(authenticated.protect, PaymentValidation.query(), handleValidation, paymentController.getAllPayments)
  .post(authenticated.protect, PaymentValidation.createPayment(), handleValidation, paymentController.createPayment);

router.route('/:id')
  .get(authenticated.protect, PaymentValidation.params(), handleValidation, paymentController.getPayment)
  .patch(authenticated.protect, PaymentValidation.updatePayment(),authorize('admin') ,handleValidation, paymentController.updatePayment)
  .delete(authenticated.protect, PaymentValidation.params(), handleValidation, paymentController.deletePayment);

router.route('/:id/payment-status')
  .patch(authenticated.protect, PaymentValidation.updatePayment(), handleValidation, paymentController.updatePaymentStatus);

export default router;

