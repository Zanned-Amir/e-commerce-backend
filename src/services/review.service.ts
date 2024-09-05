import {ReviewRepository} from '../repositories/index';
import ApiFeature from "../utils/api.feature";

class ReviewService {

          private _reviewRepository: ReviewRepository;
          
          constructor() {
          this._reviewRepository = new ReviewRepository();
          }

          async createReview(data: any) {
                    return await this._reviewRepository.create(data);
          }

          async getReviews(query: any = {}) {

                    const apiFeatures = new ApiFeature(this._reviewRepository.find(), query)
                    .filter(['page', 'sort', 'limit', 'fields'])
                    .sort()
                    .limitFields()
                    .paginate();
                    return await apiFeatures.query.exec();
                              
                   
          }

          async getReviewById(id: string) {
                    return await this._reviewRepository.findById(id);
          }

          async updateReview(id: string, data: any) {
                    return await this._reviewRepository.update(id, data);
          }

          async deleteReview(id: string) {
                    return await this._reviewRepository.delete(id);
          }

}