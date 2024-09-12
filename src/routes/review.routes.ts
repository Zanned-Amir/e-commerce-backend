import {ReviewController} from '../controllers/index';
import { Router } from 'express';

const router = Router();

const reviewController = new ReviewController();

router.route('/count').patch(reviewController.countReviews);

router.route('/').get(reviewController.getAllReviews);

router.route('/').post(reviewController.createReview);

router.route('/:id').get(reviewController.getReview);

router.route('/:id').patch(reviewController.updateReview);

router.route('/:id').delete(reviewController.deleteReview);

router.route('/:id/hide').patch(reviewController.hideReview);

router.route('/:id/show').patch(reviewController.showReview);



export default router;

