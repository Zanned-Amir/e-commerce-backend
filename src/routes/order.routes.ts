import  { Router } from 'express';
import { OrderController } from 'controllers';

const  router = Router();
const orderController = new OrderController();

router.route('/').get(orderController.getAllOrders);

router.route('/').post(orderController.createOrder);

router.route('/:id').get(orderController.getOrder);

router.route('/:id').patch(orderController.updateOrder);

router.route('/:id').delete(orderController.deleteOrder);


router.route('/:id/status').patch(orderController.updateOrderStatus);

export default router;






