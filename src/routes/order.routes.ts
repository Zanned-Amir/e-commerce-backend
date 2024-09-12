import  { Router } from 'express';
import { OrderController } from '../controllers/index';
import { OrderValidation , handleValidation } from '../middlewares/index';

const  router = Router();
const orderController = new OrderController();

router.route('/').get(OrderValidation.createOrder(), handleValidation, orderController.getAllOrders);

router.route('/').post(OrderValidation.createOrder(), handleValidation, orderController.createOrder);

router.route('/:id').get(OrderValidation.params(), handleValidation, orderController.getOrder);

router.route('/:id').patch(OrderValidation.updateOrder(), handleValidation, orderController.updateOrder);


router.route('/:id/shipping-status').patch(OrderValidation.updateOrder(), handleValidation, orderController.updateOrderStatus);

router.route('/:id').delete(OrderValidation.params(), handleValidation, orderController.deleteOrder);




export default router;






