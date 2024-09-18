import { Router } from 'express';
import { PaymentController } from '../controllers/index';
import { PaymentValidation, handleValidation } from '../middlewares/index';
import { Authenticated } from '../middlewares/index';
import authorize from '../middlewares/authorize';

const router = Router();
const paymentController = new PaymentController();
const authenticated = new Authenticated();

/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: Payment management
 */

/**
 * @swagger
 * /payments:
 *   get:
 *     summary: Get all payments
 *     tags: [Payments]
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
 *         description: List of payments
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
 *                       order:
 *                         type: string
 *                       payment_method:
 *                         type: string
 *                       amount:
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
 * /payments:
 *   post:
 *     summary: Create a new payment
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Payment'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Payment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.route('/')
  .get(authenticated.protect, PaymentValidation.query(), handleValidation, paymentController.getAllPayments)
  .post(authenticated.protect, PaymentValidation.createPayment(), handleValidation, paymentController.createPayment);

/**
 * @swagger
 * /payments/{id}:
 *   get:
 *     summary: Get a payment by ID
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the payment to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payment details
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
 *                     order:
 *                       type: string
 *                     payment_method:
 *                       type: string
 *                     amount:
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
 *         description: Payment not found
 *       401:
 *         description: Unauthorized
 *   patch:
 *     summary: Update a payment by ID
 *     tags: [Payments]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the payment to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Payment'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Payment updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Payment not found
 *       401:
 *         description: Unauthorized
 *   delete:
 *     summary: Delete a payment by ID
 *     tags: [Payments]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the payment to delete
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: Payment deleted successfully
 *       404:
 *         description: Payment not found
 *       401:
 *         description: Unauthorized
 */
router.route('/:id')
  .get(authenticated.protect, PaymentValidation.params(), handleValidation, paymentController.getPayment)
  .patch(authenticated.protect, PaymentValidation.updatePayment(), authorize('admin'), handleValidation, paymentController.updatePayment)
  .delete(authenticated.protect, PaymentValidation.params(), handleValidation, paymentController.deletePayment);

/**
 * @swagger
 * /payments/{id}/payment-status:
 *   patch:
 *     summary: Update the payment status
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the payment to update
 *         required: true
 *         schema:
 *           type: string
 *       - name: status
 *         in: body
 *         description: New status of the payment
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               enum: ['pending', 'completed', 'failed']
 *               description: New status of the payment
 *     responses:
 *       200:
 *         description: Payment status updated
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
 *                     order:
 *                       type: string
 *                     payment_method:
 *                       type: string
 *                     amount:
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
 *         description: Payment not found
 *       400:
 *         description: Invalid status
 *       401:
 *         description: Unauthorized
 */
router.route('/:id/payment-status')
  .patch(authenticated.protect, PaymentValidation.updatePayment, handleValidation, paymentController.updatePaymentStatus);

export default router;
