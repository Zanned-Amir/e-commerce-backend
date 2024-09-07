import { OrderRepository } from "../repositories/index";
import ApiFeature from "../utils/api.feature";

class OrderService {

          private _orderRepository: OrderRepository;
          
          constructor() {
          this._orderRepository = new OrderRepository();
          }


          async createOrder(data: any) {
                    return await this._orderRepository.create(data);
          }

          async getOrders(query: any = {}) {

                    const apiFeatures = new ApiFeature(this._orderRepository.find(), query)
                    .filter(['page', 'sort', 'limit', 'fields'])
                    .sort()
                    .limitFields()
                    .paginate();
                    return await apiFeatures.query.exec();
                              
                   
          }

          async getOrderById(id: string) {
                    return await this._orderRepository.findById(id);
          }

          async updateOrder(id: string, data: any) {
                    return await this._orderRepository.update(id, data);
          }

          async updateOrderStatus(id: string, status: string) {
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


