import  { Router } from 'express';
import { PaymentController } from '../controllers/index';

const router = Router();

const paymentController = new PaymentController();

router.route('/').get(paymentController.getAllPayments);

router.route('/').post(paymentController.createPayment);

router.route('/:id').get(paymentController.getPayment);

router.route('/:id').patch(paymentController.updatePayment);

router.route('/:id').delete(paymentController.deletePayment);

router.route('/:id/status').patch(paymentController.updatePaymentStatus);


export default router;

