import { InventoryRepository } from "../repositories/index";
import {ApiFeature , addPopulateFields } from '../utils/index';

class InventoryService {

          private _inventoryRepository: InventoryRepository;
          
          constructor() {
          this._inventoryRepository = new InventoryRepository();
          }

          createInventory(data: any , populated: boolean = false, fields: any[] = []) {
                                  
                              const fieldP = addPopulateFields(fields);
                              if (populated) {
          
                                        return this._inventoryRepository.createWithPopulate(data, fieldP);
                              }
                              else {
                                        return this._inventoryRepository.create(data);
                              }
          }

          getInventories(query: any = {}, pop: boolean = false) {
                    const apiFeatures = new ApiFeature(this._inventoryRepository.find(), query)
                      .filter(['page', 'sort', 'limit', 'fields'])
                      .sort()
                      .limitFields()
                      .paginate();
                              if(pop) {
                                        apiFeatures.query = apiFeatures.query.populate(
                                                  
                                                  {
                                                            "path": "product",
                                                            "select": "name"
                                                  }
                                                  
                                        
             
                                        );
          
                              }
                    
                  
                    return apiFeatures.query.exec();
                  }
                  

          getInventoryById(id: string , populated: boolean = false, fields: any[] = []) {

                    const fieldP = addPopulateFields(fields);
                    if (populated) {
            
                              return this._inventoryRepository.findByIdWithPopulate(id, fieldP);
                    }
                    else {
                              return this._inventoryRepository.findById(id);
                    }

                              
                          
          }

          updateInventory(id: string, data: any , populated: boolean = false, fields: any[] = []) {

                    const fieldP = addPopulateFields(fields);
                    if (populated) {

                              return this._inventoryRepository.updateWithPopulate(id, data, fieldP);
                    }
                    else {
                              return this._inventoryRepository.update(id, data);
                    }

                                
                                 
          }

          deleteInventory(id: string) {
                    return this._inventoryRepository.delete(id);
          }

          countInventories() {
                    return this._inventoryRepository.count();
          }

}

export default InventoryService;