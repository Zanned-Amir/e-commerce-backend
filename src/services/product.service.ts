import { ProductRepository } from "../repositories/index";
import { addPopulateFields , ApiFeature} from "../utils/index";
class ProductService {

          private _productRepository: ProductRepository;
          
          constructor() {
          this._productRepository = new ProductRepository();
          }


          async createProduct(data: any, populated: boolean = false, fields: any[] = []) {

                    const fieldP = addPopulateFields(fields);
                    if (populated) {

                              return await this._productRepository.createWithPopulate(data,fieldP);
                    }
                    else {
                              return await this._productRepository.create(data);
                    }

          }

          async getProducts(query: any = {}) {

                    const apiFeatures = new ApiFeature(this._productRepository.find(), query)
                    .filter(['page', 'sort', 'limit', 'fields'])
                    .sort()
                    .limitFields()
                    .paginate();
                    return await apiFeatures.query.exec();
                              
                   
          }

          async getProductById(id: string,populated: boolean = false, fields: any[] = []) {
                              
                              const fieldP = addPopulateFields(fields);
                              if (populated) {
          
                                        return await this._productRepository.findByIdWithPopulate(id,fieldP);
                              }
                              else {
                                        return await this._productRepository.findById(id);
                              }
          
                    }

          async updateProduct(id: string,data:any ,populated: boolean = false, fields: any[] = [] ) {
                    const fieldP = addPopulateFields(fields);
                    if (populated) {

                              return await this._productRepository.updateWithPopulate(id,data,fieldP);
                    }
                    else {
                              return await this._productRepository.update(id,data);
                    }
          }

          async deactivateProduct(id: string) {
                    return await this._productRepository.deactivate(id);
          }
          async activateProduct(id: string) {
                    return await this._productRepository.activate(id);
          }

          async deleteProduct(id: string) {
                    return await this._productRepository.delete(id);
          }

          async countProducts() {
                    return await this._productRepository.count();
          }
          

}

export default ProductService;

