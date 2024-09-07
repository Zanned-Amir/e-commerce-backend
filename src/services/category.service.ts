import { CategoryRepository } from "../repositories/index"; 
import ApiFeature from "../utils/api.feature";



class CategoryService {

          private _categoryRepository: CategoryRepository;
          
          constructor() {
          this._categoryRepository = new CategoryRepository();
          }

          async createCategory(data: any) {
                    return await this._categoryRepository.create(data);
          }

          async getCategories(query: any = {}) {

                    const apiFeatures = new ApiFeature(this._categoryRepository.find(), query)
                    .filter(['page', 'sort', 'limit', 'fields'])
                    .sort()
                    .limitFields()
                    .paginate();
                    return await apiFeatures.query.exec();
                              
                   
          }

          async getCategoryById(id: string) {
                    return await this._categoryRepository.findById(id);
          }

          async updateCategory(id: string, data: any) {
                    return await this._categoryRepository.update(id, data);
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
