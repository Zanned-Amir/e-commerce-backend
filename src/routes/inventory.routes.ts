import { Router } from 'express';
import { InventoryController } from '../controllers/index';
import { InventoryValidation, handleValidation } from '../middlewares/index';
import { Authenticated } from '../middlewares/index';
import authorize from '../middlewares/authorize';

const router = Router();
const inventoryController = new InventoryController();
const authenticated = new Authenticated();

/**
 * @swagger
 * tags:
 *   name: Inventories
 *   description: Operations related to inventory items.
 */

/**
 * @swagger
 * /inventories:
 *   get:
 *     summary: Get the count of inventory items
 *     tags: [Inventories]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The count of inventory items
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   description: The total number of inventory items
 *                   example: 120
 *   post:
 *     summary: Create a new inventory item
 *     tags: [Inventories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Inventory'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: The created inventory item
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Inventory'
 */
router.route('/')
  .get(authenticated.protect, InventoryValidation.query(), handleValidation, inventoryController.countInventories)
  .post(authenticated.protect, authorize('admin'), InventoryValidation.createInventory(), handleValidation, inventoryController.createInventory);

/**
 * @swagger
 * /inventories/{id}:
 *   get:
 *     summary: Retrieve an inventory item by ID
 *     tags: [Inventories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the inventory item
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The requested inventory item
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Inventory'
 *       404:
 *         description: Inventory item not found
 *   patch:
 *     summary: Update an inventory item by ID
 *     tags: [Inventories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the inventory item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Inventory'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The updated inventory item
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Inventory'
 *   delete:
 *     summary: Delete an inventory item by ID
 *     tags: [Inventories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the inventory item
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: Inventory item deleted
 */
router.route('/:id')
  .get(authenticated.protect, InventoryValidation.params(), handleValidation, inventoryController.getInventory)
  .patch(authenticated.protect, authorize('admin'), InventoryValidation.updateInventory(), handleValidation, inventoryController.updateInventory)
  .delete(authenticated.protect, authorize('admin'), InventoryValidation.params(), handleValidation, inventoryController.deleteInventory);

export default router;


