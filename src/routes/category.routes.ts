import  { Router } from 'express';
import { CategoryController }from '../controllers/index';

import { CategoryValidation , handleValidation } from '../middlewares/index';
const router = Router();

const categoryController = new CategoryController();

router.route('/count').patch(categoryController.countCategories);

router.route('/').get( CategoryValidation.query(), handleValidation, categoryController.getAllCategories);

router.route('/').post( CategoryValidation.createCategory, handleValidation, categoryController.createCategory);

router.route('/:id').get( CategoryValidation.params(), handleValidation, categoryController.getCategory);

router.route('/:id').patch( CategoryValidation.updateCategory, handleValidation, categoryController.updateCategory);

router.route('/:id').delete( CategoryValidation.params(), handleValidation, categoryController.deleteCategory);

router.route('/:id/deactivate').patch( CategoryValidation.params(), handleValidation,categoryController.deactivateCategory);

router.route('/:id/activate').patch( CategoryValidation.params(), handleValidation,categoryController.activateCategory);




export default router;