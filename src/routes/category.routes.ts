import  { Router } from 'express';
import { CategoryController }from '../controllers/index';

const router = Router();

const categoryController = new CategoryController();

router.route('/count').patch(categoryController.countCategories);

router.route('/').get(categoryController.getAllCategories);

router.route('/').post(categoryController.createCategory);

router.route('/:id').get(categoryController.getCategory);

router.route('/:id').patch(categoryController.updateCategory);

router.route('/:id').delete(categoryController.deleteCategory);

router.route('/:id/deactivate').patch(categoryController.deactivateCategory);

router.route('/:id/activate').patch(categoryController.activateCategory);




export default router;