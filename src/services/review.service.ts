import path from 'path';
import {ReviewRepository} from '../repositories/index';
import {ApiFeature, addPopulateFields} from "../utils/index";

class ReviewService {

          private _reviewRepository: ReviewRepository;
          
          constructor() {
          this._reviewRepository = new ReviewRepository();
          }

          async createReview(data: any, populated: boolean = false, fields: any[] = []) {

                    const fieldP = addPopulateFields(fields);
                    if(populated) {
                              return await this._reviewRepository.createWithPopulate(data, fields);
                    }
                    else {
                              return await this._reviewRepository.create(data);
                    }
          }

          async getReviews(query: any = {}, pop: boolean = false) {

                    const apiFeatures = new ApiFeature(this._reviewRepository.find(), query)
                    .filter(['page', 'sort', 'limit', 'fields'])
                    .sort()
                    .limitFields()
                    .paginate();
                    if(pop) {
                              apiFeatures.query = apiFeatures.query.populate(
                                      [
                                        {
                                                  "path": "product",
                                                  "select": "name"
                                        }
                                        ,
                                        {
                                                  "path": "user",
                                                  "select": "name"
                                        }
                                      ]
                              );

                     }

                    return await apiFeatures.query.exec();
                    }         

          async getReviewById(id: string ,populated: boolean = false, fields: any[] = []) {

                              const fieldP = addPopulateFields(fields);
                              if (populated) {
          
                                        return await this._reviewRepository.findByIdWithPopulate(id, fieldP);
                              }
                              else {
                                        return await this._reviewRepository.findById(id);
                              }
          
                    
                    
          }

          async updateReview(id: string, data: any, populated: boolean = false, fields: any[] = []) {

                    const fieldP = addPopulateFields(fields);
                    if (populated) {
                              return await this._reviewRepository.updateWithPopulate(id, data, fieldP);
                    }
                    else {
                              return await this._reviewRepository.update(id, data);
                    }
                    
          }

          async deleteReview(id: string) {
                    return await this._reviewRepository.delete(id);
          }

          async hideReview(id: string) {
                    return await this._reviewRepository.update(id, {status: true});
          }

          async showReview(id: string) {
                    return await this._reviewRepository.update(id, {status: false});
          }

          async countReviews() {
                    return await this._reviewRepository.count();
          }

}

export default ReviewService;