
import {UserRepository} from '../repositories/index';
import ApiFeature from "../utils/api.feature";

class UserService {

          private _userRepository: UserRepository;
          
          constructor() {
          this._userRepository = new UserRepository();
          }


          async createUser(data: any) {
                    return await this._userRepository.create(data);
          }

          async getUsers(query: any = {}) {

                    const apiFeatures = new ApiFeature(this._userRepository.find(), query)
                    .filter(['page', 'sort', 'limit', 'fields'])
                    .sort()
                    .limitFields()
                    .paginate();
                    return await apiFeatures.query.exec();
                              
                   
          }

          async getUserById(id: string) {
                    return await this._userRepository.findById(id);
          }

          async updateUser(id: string, data: any) {
                    return await this._userRepository.update(id, data);
          }

          async deactivateUser(id: string) {
                    return await this._userRepository.deactivate(id);
          }

          async activateUser(id: string) {
                    return await this._userRepository.activate(id);
          }

          async deleteUser(id: string) {
                    return await this._userRepository.delete(id);
          }

          async countUsers() {
                    return await this._userRepository.count();
          }
        
}
 
export default UserService;
