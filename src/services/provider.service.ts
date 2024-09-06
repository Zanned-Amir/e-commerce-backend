import { ProviderRepository } from "repositories"; 
import ApiFeature from "utils/api.feature";

class ProviderService {

          private _providerRepository: ProviderRepository;
          
          constructor() {
          this._providerRepository = new ProviderRepository();
          }


          async createProvider(data: any) {
                    return await this._providerRepository.create(data);
          }

          async getProviders(query: any = {}) {

                    const apiFeatures = new ApiFeature(this._providerRepository.find(), query)
                    .filter(['page', 'sort', 'limit', 'fields'])
                    .sort()
                    .limitFields()
                    .paginate();
                    return await apiFeatures.query.exec();
                              
                   
          }

          async getProviderById(id: string) {
                    return await this._providerRepository.findById(id);
          }

          async updateProvider(id: string, data: any) {
                    return await this._providerRepository.update(id, data);
          }

          async deleteProvider(id: string) {
                    return await this._providerRepository.delete(id);
          }

          async countProviders() {
                    return await this._providerRepository.count();
          }

}

export default ProviderService;