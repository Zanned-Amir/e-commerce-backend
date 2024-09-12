import  { Router } from 'express';
import { InventoryController } from '../controllers/index';

import { InventoryValidation , handleValidation } from '../middlewares/index';

const router = Router();

const inventoryController = new InventoryController();

router.route('/').get( InventoryValidation.query(), handleValidation, inventoryController.countInventories);

router.route('/').post( InventoryValidation.createInventory(), handleValidation, inventoryController.createInventory);

router.route('/:id').get( InventoryValidation.params(), handleValidation, inventoryController.getInventory);

router.route('/:id').patch( InventoryValidation.updateInventory(), handleValidation, inventoryController.updateInventory);

router.route('/:id').delete( InventoryValidation.params(), handleValidation, inventoryController.deleteInventory);




export default router;

