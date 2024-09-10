import { CategoryRepository } from "../repositories/index"; 
import {ApiFeature , addPopulateFields } from '../utils/index';




class CategoryService {

          private _categoryRepository: CategoryRepository;
          
          constructor() {
          this._categoryRepository = new CategoryRepository();
          }

          async createCategory(data: any , populated: boolean = false, fields: any[] = []) {

                    const fieldP = addPopulateFields(fields);
                    if (populated) {
            
                              return await this._categoryRepository.createWithPopulate(data, fieldP);
                    }
                    else {
                              return await this._categoryRepository.create(data);
                    }

                    
                   

          }

          async getCategories(query: any = {}) {

                    const apiFeatures = new ApiFeature(this._categoryRepository.find(), query)
                    .filter(['page', 'sort', 'limit', 'fields'])
                    .sort()
                    .limitFields()
                    .paginate();
                    return await apiFeatures.query.exec();
                              
                   
          }

          async getCategoryById(id: string , populated: boolean = false, fields: any[] = []) {

                    const fieldP = addPopulateFields(fields);
                    if (populated) {
            
                              return await this._categoryRepository.findByIdWithPopulate(id, fieldP);
                    }
                    else {
                              return await this._categoryRepository.findById(id);
                    }


                  
          }

          async updateCategory(id: string, data: any , populated: boolean = false, fields: any[] = []) {

                    const fieldP = addPopulateFields(fields);
                    if (populated) {

                              return await this._categoryRepository.updateWithPopulate(id, data, fieldP);
                    }
                    else {
                              return await this._categoryRepository.update(id, data);
                    }
                  
          }

          async deactivateCategory(id: string) {
                    return await this._categoryRepository.deactivate(id);
          }

          async activateCategory(id: string) {
                    return await this._categoryRepository.activate(id);
          }

          async deleteCategory(id: string) {
                    return await this._categoryRepository.delete(id);
          }

          async countCategories() {
                    return await this._categoryRepository.count();
          }

          async countFilteredCategories(query: any = {}) {
                    const apiFeatures = new ApiFeature(this._categoryRepository.find(), query)
                        .filter(['page', 'sort', 'limit', 'fields']);
                        
                    return await apiFeatures.count();
                }
}

export default CategoryService;
