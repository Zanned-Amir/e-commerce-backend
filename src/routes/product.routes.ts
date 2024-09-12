import  { Router } from 'express';
import { ProductController } from '../controllers/index';

import { ProductValidation , handleValidation } from '../middlewares/index';

const  router = Router();
const productController = new ProductController();



router.route('/count').get(productController.countProducts);

router.route('/').get(ProductValidation.query(), handleValidation, productController.getAllProducts);

router.route('/').post( ProductValidation.createProduct(), handleValidation, productController.createProduct);

router.route('/:id').get(ProductValidation.params(), handleValidation, productController.getProduct);

router.route('/:id').patch( ProductValidation.updateProduct(), handleValidation, productController.updateProduct);

router.route('/:id/deactivate').patch( ProductValidation.params(), handleValidation,productController.deactivateProduct);

router.route('/:id/activate').patch( ProductValidation.params(), handleValidation,productController.activateProduct);



router.route('/:id').delete(ProductValidation.params(), handleValidation, productController.deleteProduct);

export default router;



