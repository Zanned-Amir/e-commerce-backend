import { Router } from 'express';
import { ProductController } from '../controllers/index';
import { ProductValidation, handleValidation } from '../middlewares/index';
import { Authenticated } from '../middlewares/index';
import authorize from '../middlewares/authorize';

const router = Router();
const productController = new ProductController();
const authenticated = new Authenticated();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Manage products and perform operations
 */

/**
 * @swagger
 * /products/count:
 *   get:
 *     summary: Get the count of products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: The count of products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   description: The total number of products.
 *                   example: 100
 */
router.route('/count')
  .get(productController.countProducts);

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Retrieve all products
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of products per page
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: The status of the response
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *       401:
 *         description: Unauthorized
 */
router.route('/')
  .get(ProductValidation.query(), handleValidation, productController.getAllProducts)
  .post(authenticated.protect, authorize('admin'), ProductValidation.createProduct(), handleValidation, productController.createProduct);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Retrieve a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product
 *     responses:
 *       200:
 *         description: The requested product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       401:
 *         description: Unauthorized
 *   patch:
 *     summary: Update a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: The updated product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Product not found
 *       401:
 *         description: Unauthorized
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product
 *     responses:
 *       204:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 *       401:
 *         description: Unauthorized
 */
router.route('/:id')
  .get(ProductValidation.params(), handleValidation, productController.getProduct)
  .patch(authenticated.protect, authorize('admin'), ProductValidation.updateProduct(), handleValidation, productController.updateProduct)
  .delete(authenticated.protect, authorize('admin'), ProductValidation.params(), handleValidation, productController.deleteProduct);

/**
 * @swagger
 * /products/{id}/deactivate:
 *   patch:
 *     summary: Deactivate a product by ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product
 *     responses:
 *       200:
 *         description: Product deactivated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       401:
 *         description: Unauthorized
 */
router.route('/:id/deactivate')
  .patch(authenticated.protect, authorize('admin'), ProductValidation.params(), handleValidation, productController.deactivateProduct);

/**
 * @swagger
 * /products/{id}/activate:
 *   patch:
 *     summary: Activate a product by ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product
 *     responses:
 *       200:
 *         description: Product activated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       401:
 *         description: Unauthorized
 */
router.route('/:id/activate')
  .patch(authenticated.protect, authorize('admin'), ProductValidation.params(), handleValidation, productController.activateProduct);

export default router;
