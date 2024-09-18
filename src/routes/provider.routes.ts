import  { Router } from 'express';
import { ProviderController } from '../controllers/index';

import { ProviderValidation , handleValidation } from '../middlewares/index';

import { Authenticated } from '../middlewares/index';
import authorize from '../middlewares/authorize';


const  router = Router();
const providerController = new ProviderController();
const authenticated = new Authenticated();

router.route('/count')
  .get(providerController.countProviders);

router.route('/')
  .get(ProviderValidation.query(), handleValidation, providerController.getAllProviders)
  .post(authenticated.protect, authorize('admin'), ProviderValidation.createProvider(), handleValidation, providerController.createProvider);

router.route('/:id')
  .get(ProviderValidation.params(), handleValidation, providerController.getProvider)
  .patch(authenticated.protect, authorize('admin'), ProviderValidation.updateProvider(), handleValidation, providerController.updateProvider)
  .delete(authenticated.protect, authorize('admin'), ProviderValidation.params(), handleValidation, providerController.deleteProvider);


export default router;


