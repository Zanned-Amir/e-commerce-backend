
import { OrderRepository } from "../repositories/index";
import {ApiFeature , addPopulateFields } from '../utils/index';

class OrderService {

          private _orderRepository: OrderRepository;
          
          constructor() {
          this._orderRepository = new OrderRepository();
          }


          async createOrder(data: any , populated: boolean = false, fields: any[] = []) {

                    const fieldP = addPopulateFields(fields);
                    if (populated) {

                              return await this._orderRepository.createWithPopulate(data, fieldP);
                    }
                    else {
                              return await this._orderRepository.create(data);
                    }


          
                 
                  
          }

          async getOrders(query: any = {}) {

                    const apiFeatures = new ApiFeature(this._orderRepository.find(), query)
                    .filter(['page', 'sort', 'limit', 'fields'])
                    .sort()
                    .limitFields()
                    .paginate();
                    return await apiFeatures.query.exec();
                              
                   
          }

          async getOrderById(id: string , populated: boolean = false, fields: any[] = []) {
                    
                    const fieldP = addPopulateFields(fields);
                    if (populated) {
            
                              return await this._orderRepository.findByIdWithPopulate(id, fieldP);
                    }
                    else {
                              return await this._orderRepository.findById(id);
                    }
          }

          async updateOrder(id: string, data: any , populated: boolean = false, fields: any[] = []) {
                    
                    const fieldP = addPopulateFields(fields);
                    if (populated) {

                              return await this._orderRepository.updateWithPopulate(id, data, fieldP);
                    }
                    else {
                              return await this._orderRepository.update(id, data,{runValidators: true});
                    }
                  
          }

          async updateOrderStatus(id: string, status: string  ) {
                    return await this._orderRepository.updateStatus(id, status);
          }
          

        
          async deleteOrder(id: string) {
                    return await this._orderRepository.delete(id);
          }

          async countOrders() {
                    return await this._orderRepository.count();
          }

}

export default OrderService;


