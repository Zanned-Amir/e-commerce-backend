import { Router } from 'express';
import { OrderController } from '../controllers/index';
import { OrderValidation, handleValidation } from '../middlewares/index';
import { Authenticated } from '../middlewares/index';
import authorize from '../middlewares/authorize';

const router = Router();
const orderController = new OrderController();
const authenticated = new Authenticated();

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Page number for pagination
 *         required: false
 *         schema:
 *           type: integer
 *       - name: limit
 *         in: query
 *         description: Number of items per page
 *         required: false
 *         schema:
 *           type: integer
 *       - name: sort
 *         in: query
 *         description: Sorting order
 *         required: false
 *         schema:
 *           type: string
 *       - name: fields
 *         in: query
 *         description: Fields to include in response
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       user:
 *                         type: string
 *                       address:
 *                         type: string
 *                       products:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             product:
 *                               type: string
 *                             quantity:
 *                               type: number
 *                             price:
 *                               type: number
 *                             discount:
 *                               type: number
 *                             total:
 *                               type: number
 *                       total:
 *                         type: number
 *                       discount:
 *                         type: number
 *                       status:
 *                         type: string
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                       updated_at:
 *                         type: string
 *                         format: date-time
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.route('/')
  .get(authenticated.protect, OrderValidation.query(), handleValidation, orderController.getAllOrders)
  .post(authenticated.protect, OrderValidation.createOrder(), handleValidation, orderController.createOrder);

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Get an order by ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the order to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: string
 *                     address:
 *                       type: string
 *                     products:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           product:
 *                             type: string
 *                           quantity:
 *                             type: number
 *                           price:
 *                             type: number
 *                           discount:
 *                             type: number
 *                           total:
 *                             type: number
 *                     total:
 *                       type: number
 *                     discount:
 *                       type: number
 *                     status:
 *                       type: string
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *       404:
 *         description: Order not found
 *       401:
 *         description: Unauthorized
 *   patch:
 *     summary: Update an order by ID
 *     tags: [Orders]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the order to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Order updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Order not found
 *       401:
 *         description: Unauthorized
 *   delete:
 *     summary: Delete an order by ID
 *     tags: [Orders]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the order to delete
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: Order deleted successfully
 *       404:
 *         description: Order not found
 *       401:
 *         description: Unauthorized
 */
router.route('/:id')
  .get(authenticated.protect, OrderValidation.params(), handleValidation, orderController.getOrder)
  .patch(authenticated.protect, OrderValidation.updateOrder(), handleValidation, orderController.updateOrder)
  .delete(authenticated.protect, OrderValidation.params(), handleValidation, orderController.deleteOrder);

/**
 * @swagger
 * /orders/{id}/shipping-status:
 *   patch:
 *     summary: Update the shipping status of an order
 *     tags: [Orders]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the order to update
 *         required: true
 *         schema:
 *           type: string
 *       - name: status
 *         in: body
 *         description: New shipping status of the order
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               enum: ['pending', 'completed', 'cancelled']
 *               description: New status of the order
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Order status updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: string
 *                     address:
 *                       type: string
 *                     products:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           product:
 *                             type: string
 *                           quantity:
 *                             type: number
 *                           price:
 *                             type: number
 *                           discount:
 *                             type: number
 *                           total:
 *                             type: number
 *                     total:
 *                       type: number
 *                     discount:
 *                       type: number
 *                     status:
 *                       type: string
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *       404:
 *         description: Order not found
 *       400:
 *         description: Invalid status
 *       401:
 *         description: Unauthorized
 */
router.route('/:id/shipping-status')
  .patch(authenticated.protect, OrderValidation.updateOrder(), handleValidation, orderController.updateOrderStatus);

export default router;
