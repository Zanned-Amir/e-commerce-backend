import  { Router } from 'express';
import { OrderController } from '../controllers/index';
import { OrderValidation , handleValidation } from '../middlewares/index';
import { Authenticated } from '../middlewares/index';
import authorize from '../middlewares/authorize';

const router = Router();
const orderController = new OrderController();
const authenticated = new Authenticated();

router.route('/')
  .get(authenticated.protect, OrderValidation.query(), handleValidation, orderController.getAllOrders)
  .post(authenticated.protect, OrderValidation.createOrder(), handleValidation, orderController.createOrder);

router.route('/:id')
  .get(authenticated.protect, OrderValidation.params(), handleValidation, orderController.getOrder)
  .patch(authenticated.protect, OrderValidation.updateOrder(), handleValidation, orderController.updateOrder)
  .delete(authenticated.protect, OrderValidation.params(), handleValidation, orderController.deleteOrder);

router.route('/:id/shipping-status')
  .patch(authenticated.protect, OrderValidation.updateOrder(), handleValidation, orderController.updateOrderStatus);

export default router;






