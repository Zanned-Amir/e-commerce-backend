import { InventoryRepository } from "../repositories/index";
import ApiFeature from "../utils/api.feature";

class InventoryService {

          private _inventoryRepository: InventoryRepository;
          
          constructor() {
          this._inventoryRepository = new InventoryRepository();
          }

          createInventory(data: any) {
                    return this._inventoryRepository.create(data);
          }

          getInventories(query: any = {}) {

                    const apiFeatures = new ApiFeature(this._inventoryRepository.find(), query)
                    .filter(['page', 'sort', 'limit', 'fields'])
                    .sort()
                    .limitFields()
                    .paginate();
                    return apiFeatures.query.exec();
                              
                   
          }

          getInventoryById(id: string) {
                    return this._inventoryRepository.findById(id);
          }

          updateInventory(id: string, data: any) {
                    return this._inventoryRepository.update(id, data);
          }

          deleteInventory(id: string) {
                    return this._inventoryRepository.delete(id);
          }

          countInventories() {
                    return this._inventoryRepository.count();
          }

}

export default InventoryService;