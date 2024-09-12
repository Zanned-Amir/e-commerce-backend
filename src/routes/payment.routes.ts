import  { Router } from 'express';
import { PaymentController } from '../controllers/index';

import { PaymentValidation , handleValidation } from '../middlewares/index';


const router = Router();

const paymentController = new PaymentController();

router.route('/').get(PaymentValidation.query(), handleValidation, paymentController.getAllPayments);

router.route('/').post(PaymentValidation.createPayment(), handleValidation, paymentController.createPayment);

router.route('/:id').get(PaymentValidation.params(), handleValidation, paymentController.getPayment);

router.route('/:id').patch(PaymentValidation.updatePayment(), handleValidation, paymentController.updatePayment);

router.route('/:id').delete(PaymentValidation.params(), handleValidation, paymentController.deletePayment);

router.route('/:id/payment-status').patch( PaymentValidation.updatePayment(), handleValidation, paymentController.updatePaymentStatus);


export default router;

