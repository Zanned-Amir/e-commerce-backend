import { Request, Response } from 'express';
import  catchAsync  from '../utils/catch.async';
import { ReviewService} from '../services/index';
import AppError from '../utils/app.error';



class ReviewController  {

          private _reviewService: ReviewService;

          constructor() {
                    this._reviewService = new ReviewService();
                    }

          getAllReviews = catchAsync(async (req: Request, res: Response) => {
                              
                              
                              const pop = req.query.pop || false;
                              const query = delete req.query.pop;
                              let reviews ;
                        
                              if(pop) {
                               reviews = await this._reviewService.getReviews(query ,true);
                              }
                              else {
                               reviews = await this._reviewService.getReviews(query);
                              }
                         
          
                              res.status(200).json({
                                        status: 'success',
                                        data: reviews,
                              });
                    });

          createReview = catchAsync(async (req: Request, res: Response) => {
                              const body = req.body;
                              const newReview = await this._reviewService.createReview(body);
          
                              res.status(201).json({
                                        status: 'success',
                                        data: newReview,
                              });
                    });

          getReview = catchAsync(async (req: Request, res: Response) => {
                              const id: string = req.params.id;

                              const pop = req.query.pop || false;
                              let review ;
                              if(pop) {
                               review = await this._reviewService.getReviewById(id, true, [['product', 'name'],['user', 'name']]);
                              }
                              else {
                               review = await this._reviewService.getReviewById(id);
                              }
          
                              if (!review) {
                                        throw new AppError('Review not found', 404);
                              }
          
                              res.status(200).json({
                                        status: 'success',
                                        data: review,
                              });
                    });

          updateReview = catchAsync(async (req: Request, res: Response) => {
                              const id: string = req.params.id;
                              const body = req.body;
                              const updatedReview = await this._reviewService.updateReview(id, body);
          
                              res.status(200).json({
                                        status: 'success',
                                        data: updatedReview,
                              });
                    });

          hideReview = catchAsync(async (req: Request, res: Response) => {

                              const id: string = req.params.id;
                              const updatedReview = await this._reviewService.hideReview(id);
          
                              res.status(200).json({
                                        status: 'success',
                                        data: updatedReview,
                              });
                    });

          showReview = catchAsync(async (req: Request, res: Response) => {
                              const id: string = req.params.id;
                              const updatedReview = await this._reviewService.showReview(id);
          
                              res.status(200).json({
                                        status: 'success',
                                        data: updatedReview,
                              });
                    });

          deleteReview = catchAsync(async (req: Request, res: Response) => {
                              const id: string = req.params.id;
                              await this._reviewService.deleteReview(id);
          
                              res.status(204).json({
                                        status: 'success',
                                        data: null,
                              });
                    });

                    countReviews = catchAsync(async (req: Request, res: Response) => {
                              const count = await this._reviewService.countReviews();
          
                              res.status(200).json({
                                        status: 'success',
                                        data: count,
                              });
                    });

}

export default ReviewController;