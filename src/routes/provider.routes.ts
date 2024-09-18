import { Router } from 'express';
import { ProviderController } from '../controllers/index';
import { ProviderValidation, handleValidation } from '../middlewares/index';
import { Authenticated } from '../middlewares/index';
import authorize from '../middlewares/authorize';

const router = Router();
const providerController = new ProviderController();
const authenticated = new Authenticated();

/**
 * @swagger
 * tags:
 *   name: Providers
 *   description: Operations related to providers.
 */

/**
 * @swagger
 * /providers/count:
 *   get:
 *     summary: Get the count of providers
 *     tags: [Providers]
 *     responses:
 *       200:
 *         description: The count of providers
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   description: The total number of providers.
 *                   example: 50
 */
router.route('/count')
  .get(providerController.countProviders);

/**
 * @swagger
 * /providers:
 *   get:
 *     summary: Retrieve all providers
 *     tags: [Providers]
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
 *         description: Number of providers per page
 *     responses:
 *       200:
 *         description: A list of providers
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
 *                     $ref: '#/components/schemas/Provider'
 */

 /**
     * @swagger
     * /providers:
     *   post:
     *     summary: Create a new provider
     *     tags: [Providers]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *                 description: Name of the provider
     *               contact_info:
     *                 type: string
     *                 description: Contact information for the provider
     *               address:
     *                 type: string
     *                 description: Address of the provider
     *             required:
     *               - name
     *               - contact_info
     *     responses:
     *       201:
     *         description: Provider created successfully
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
     *                   $ref: '#/components/schemas/Provider'
     *       400:
     *         description: Bad request
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Server error
     */
router.route('/')
  .get(ProviderValidation.query(), handleValidation, providerController.getAllProviders)
  .post(authenticated.protect, authorize('admin'), ProviderValidation.createProvider(), handleValidation, providerController.createProvider);

/**
 * @swagger
 * /providers/{id}:
 *   get:
 *     summary: Retrieve a provider by ID
 *     tags: [Providers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the provider
 *     responses:
 *       200:
 *         description: The requested provider
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Provider'
 *       404:
 *         description: Provider not found
 *       401:
 *         description: Unauthorized
 *   patch:
 *     summary: Update a provider by ID
 *     tags: [Providers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the provider
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Provider'
 *     responses:
 *       200:
 *         description: The updated provider
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Provider'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Provider not found
 *       401:
 *         description: Unauthorized
 *   delete:
 *     summary: Delete a provider by ID
 *     tags: [Providers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the provider
 *     responses:
 *       204:
 *         description: Provider deleted successfully
 *       404:
 *         description: Provider not found
 *       401:
 *         description: Unauthorized
 */
router.route('/:id')
  .get(ProviderValidation.params(), handleValidation, providerController.getProvider)
  .patch(authenticated.protect, authorize('admin'), ProviderValidation.updateProvider(), handleValidation, providerController.updateProvider)
  .delete(authenticated.protect, authorize('admin'), ProviderValidation.params(), handleValidation, providerController.deleteProvider);

export default router;


