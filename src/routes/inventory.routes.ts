import  { Router } from 'express';
import { InventoryController } from '../controllers/index';

import { InventoryValidation , handleValidation } from '../middlewares/index';
import { Authenticated } from '../middlewares/index';
import authorize from '../middlewares/authorize';

const router = Router();
const inventoryController = new InventoryController();
const authenticated = new Authenticated();

router.route('/')
  .get(authenticated.protect, InventoryValidation.query(), handleValidation, inventoryController.countInventories)
  .post(authenticated.protect, authorize('admin'), InventoryValidation.createInventory(), handleValidation, inventoryController.createInventory);

router.route('/:id')
  .get(authenticated.protect, InventoryValidation.params(), handleValidation, inventoryController.getInventory)
  .patch(authenticated.protect, authorize('admin'), InventoryValidation.updateInventory(), handleValidation, inventoryController.updateInventory)
  .delete(authenticated.protect, authorize('admin'), InventoryValidation.params(), handleValidation, inventoryController.deleteInventory);

export default router;

