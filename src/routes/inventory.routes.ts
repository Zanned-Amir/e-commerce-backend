import  { Router } from 'express';
import { InventoryController } from 'controllers';

const router = Router();

const inventoryController = new InventoryController();

router.route('/').get(inventoryController.getAllInventory);

router.route('/').post(inventoryController.createInventory);

router.route('/:id').get(inventoryController.getInventory);

router.route('/:id').patch(inventoryController.updateInventory);

router.route('/:id').delete(inventoryController.deleteInventory);


export default router;

