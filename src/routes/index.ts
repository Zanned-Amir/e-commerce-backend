import userRouter from './user.routes';
import productRouter from './product.routes';
import orderRouter from './order.routes';
import paymentRouter from './payment.routes';
import reviewRouter from './review.routes';
import inventoryRouter from './inventory.routes';
import providerRouter from './provider.routes';
import categoryRouter from './category.routes';
import authRouter from './auth.routes';

import { Router } from 'express';

//Todo:  add for  each route cleanRequest  function to clean request body before sending to controller
const router = Router();

router.use('/users', userRouter);
router.use('/products', productRouter);
router.use('/orders', orderRouter);
router.use('/payments', paymentRouter);
router.use('/reviews', reviewRouter);
router.use('/inventories', inventoryRouter);
router.use('/providers', providerRouter);
router.use('/categories', categoryRouter);
router.use('/auth', authRouter);



export default router;
