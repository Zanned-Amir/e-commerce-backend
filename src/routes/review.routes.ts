import {ReviewController} from '../controllers/index';
import { Router } from 'express';
import { handleValidation ,ReviewValidation } from '../middlewares/index';


const router = Router();

const reviewController = new ReviewController();

router.route('/count').patch(reviewController.countReviews);

router.route('/').get( ReviewValidation.query(), handleValidation, reviewController.getAllReviews);

router.route('/').post(ReviewValidation.createReview(), handleValidation, reviewController.createReview);

router.route('/:id').get(ReviewValidation.params(), handleValidation, reviewController.getReview);

router.route('/:id').patch( ReviewValidation.updateReview(), handleValidation, reviewController.updateReview);

router.route('/:id').delete(ReviewValidation.params(), handleValidation, reviewController.deleteReview);

router.route('/:id/hide').patch(ReviewValidation.params(), handleValidation,reviewController.hideReview);

router.route('/:id/show').patch(ReviewValidation.params(), handleValidation,reviewController.showReview);



export default router;

