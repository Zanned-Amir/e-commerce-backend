import  { PaymentRepository } from "../repositories/index";
import {ApiFeature , addPopulateFields } from '../utils/index';

class PaymentService {

          private _paymentRepository: PaymentRepository;
          
          constructor() {
          this._paymentRepository = new PaymentRepository();
          }

          async createPayment(data: any , populated: boolean = false, fields: any[] = []) {

                    const fieldP = addPopulateFields(fields);
                    if (populated) {

                              return await this._paymentRepository.createWithPopulate(data, fieldP);
                    }
                    else {
                              return await this._paymentRepository.create(data);
                    }
                   
          }

          async getPayments(query: any = {}) {

                    const apiFeatures = new ApiFeature(this._paymentRepository.find(), query)
                    .filter(['page', 'sort', 'limit', 'fields'])
                    .sort()
                    .limitFields()
                    .paginate();
                    return await apiFeatures.query.exec();
                              
                   
          }

          async getPaymentById(id: string ,populated: boolean = false, fields: any[] = []) {

                              const fieldP = addPopulateFields(fields);
                              if (populated) {
          
                                        return await this._paymentRepository.findByIdWithPopulate(id, fieldP);
                              }
                              else {
                                        return await this._paymentRepository.findById(id);
                              }
                   
          }

          async updatePayment(id: string, data: any , populated: boolean = false, fields: any[] = []) {
                  
                    const fieldP = addPopulateFields(fields);
                    if (populated) {
                              return await this._paymentRepository.updateWithPopulate(id, data, fieldP);
                    }
                    else {
                              return await this._paymentRepository.update(id, data);
                    }
          }

          async deletePayment(id: string) {
                    return await this._paymentRepository.delete(id);
          }

          async updatePaymentStatus(id: string, status: string) {
                    return await this._paymentRepository.update(id, { status });
          }

          async countPayments() {
                    return await this._paymentRepository.count();
          }

}

export default PaymentService;