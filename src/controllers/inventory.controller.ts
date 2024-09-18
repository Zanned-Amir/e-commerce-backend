import { Request, Response ,NextFunction } from 'express';
import AppError from '../utils/app.error';
import catchAsync from '../utils/catch.async';
import { InventoryService} from '../services/index';  


class InventoryController {

  private _inventoryService: InventoryService;

  constructor() {
    this._inventoryService = new InventoryService();
  }

  getAllInventory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const pop = req.query.pop || false;
    const query = delete req.query.pop;

    let inventory;

    if (pop) {

     inventory = await this._inventoryService.getInventories(query , true);
    }
    else {
     inventory = await this._inventoryService.getInventories(query);
    }

    res.status(200).json({
      status: 'success',
      data: inventory,
    });
  });

  createInventory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { product, label, qauntity } = req.body;
    const newInventory = await this._inventoryService.createInventory({ product, label, qauntity });

    res.status(201).json({
      status: 'success',
      data: newInventory,
    });
  });

  getInventory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id: string = req.params.id;
    const pop = req.query.pop || false;
    let  inventory;
    if(pop) {
       inventory = await this._inventoryService.getInventoryById(id, true, [['product', 'name']]);
    } else {
       inventory = await this._inventoryService.getInventoryById(id);
    }


    if (!inventory) {
      throw new AppError('Inventory not found', 404);
    }

    res.status(200).json({
      status: 'success',
      data: inventory,
    });
  });

  updateInventory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id: string = req.params.id;
    const { product, label, qauntity } = req.body;
    const updatedInventory = await this._inventoryService.updateInventory(id, { product, label, qauntity });

    res.status(200).json({
      status: 'success',
      data: updatedInventory,
    });
  });


  deleteInventory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id: string = req.params.id;
    await this._inventoryService.deleteInventory(id);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

  countInventories = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const count = await this._inventoryService.countInventories();

    res.status(200).json({
      status: 'success',
      data: count,
    });
  });
  
   

}

export default InventoryController;