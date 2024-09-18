import {ReviewController} from '../controllers/index';
import { Router } from 'express';
import { handleValidation ,ReviewValidation } from '../middlewares/index';
import { Authenticated } from '../middlewares/index';
import authorize from '../middlewares/authorize';


const router = Router();

const reviewController = new ReviewController();
const authenticated = new Authenticated();

router.route('/count')
  .get(authenticated.protect, authorize('admin'), reviewController.countReviews);

router.route('/')
  .get(authenticated.protect, ReviewValidation.query(), handleValidation, reviewController.getAllReviews)
  .post(authenticated.protect, ReviewValidation.createReview(), handleValidation, reviewController.createReview);

router.route('/:id')
  .get(authenticated.protect, ReviewValidation.params(), handleValidation, reviewController.getReview)
  .patch(authenticated.protect, authorize('admin'), ReviewValidation.updateReview(), handleValidation, reviewController.updateReview)
  .delete(authenticated.protect, authorize('admin'), ReviewValidation.params(), handleValidation, reviewController.deleteReview);

router.route('/:id/hide')
  .patch(authenticated.protect, authorize('admin'), ReviewValidation.params(), handleValidation, reviewController.hideReview);

router.route('/:id/show')
  .patch(authenticated.protect, authorize('admin'), ReviewValidation.params(), handleValidation, reviewController.showReview);

export default router;
