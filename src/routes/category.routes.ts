import  { Router } from 'express';
import { CategoryController }from '../controllers/index';

import { CategoryValidation , handleValidation } from '../middlewares/index';
import { Authenticated } from '../middlewares/index';
import authorize from '../middlewares/authorize';
const router = Router();

const categoryController = new CategoryController();
const authenticated = new Authenticated();

router.route('/count')
  .get(categoryController.countCategories);

router.route('/')
  .get(authenticated.protect, CategoryValidation.query(), handleValidation, categoryController.getAllCategories)
  .post(authenticated.protect, authorize('admin'), CategoryValidation.createCategory(), handleValidation, categoryController.createCategory);

router.route('/:id')
  .get(CategoryValidation.params(), handleValidation, categoryController.getCategory)
  .patch(authenticated.protect, authorize('admin'), CategoryValidation.updateCategory(), handleValidation, categoryController.updateCategory)
  .delete(authenticated.protect, authorize('admin'), CategoryValidation.params(), handleValidation, categoryController.deleteCategory);

router.route('/:id/deactivate')
  .patch(authenticated.protect, authorize('admin'), CategoryValidation.params(), handleValidation, categoryController.deactivateCategory);

router.route('/:id/activate')
  .patch(authenticated.protect, authorize('admin'), CategoryValidation.params(), handleValidation, categoryController.activateCategory);

export default router;
