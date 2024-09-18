import  { Router } from 'express';
import { ProductController } from '../controllers/index';

import { ProductValidation , handleValidation } from '../middlewares/index';
import { Authenticated } from '../middlewares/index';
import authorize from '../middlewares/authorize';


const  router = Router();
const productController = new ProductController();
const authenticated = new Authenticated();

router.route('/count')
  .get(productController.countProducts);

router.route('/')
  .get(ProductValidation.query(), handleValidation, productController.getAllProducts)
  .post(authenticated.protect, authorize('admin'), ProductValidation.createProduct(), handleValidation, productController.createProduct);

router.route('/:id')
  .get(ProductValidation.params(), handleValidation, productController.getProduct)
  .patch(authenticated.protect, authorize('admin'), ProductValidation.updateProduct(), handleValidation, productController.updateProduct)
  .delete(authenticated.protect, authorize('admin'), ProductValidation.params(), handleValidation, productController.deleteProduct);

router.route('/:id/deactivate')
  .patch(authenticated.protect, authorize('admin'), ProductValidation.params(), handleValidation, productController.deactivateProduct);

router.route('/:id/activate')
  .patch(authenticated.protect, authorize('admin'), ProductValidation.params(), handleValidation, productController.activateProduct);

export default router;




