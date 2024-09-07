import  { Router } from 'express';
import { ProductController } from '../controllers/index';

const  router = Router();
const productController = new ProductController();


router.route('/').get(productController.getAllProducts);

router.route('/').post(productController.createProduct);

router.route('/:id').get(productController.getProduct);

router.route('/:id').patch(productController.updateProduct);

router.route('/:id/deactivate').patch(productController.deactivateProduct);

router.route('/:id/activate').patch(productController.activateProduct);

router.route('/:id/count').patch(productController.countProducts);


router.route('/:id').delete(productController.deleteProduct);

export default router;



