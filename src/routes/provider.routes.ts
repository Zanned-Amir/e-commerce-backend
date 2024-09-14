import  { Router } from 'express';
import { ProviderController } from '../controllers/index';

import { ProviderValidation , handleValidation } from '../middlewares/index';

const  router = Router();
const providerController = new ProviderController();

router.route('/count').get(providerController.countProviders);

router.route('/').get(ProviderValidation.query(), handleValidation, providerController.getAllProviders);

router.route('/').post( ProviderValidation.createProvider(), handleValidation, providerController.createProvider);

router.route('/:id').get(ProviderValidation.params(), handleValidation, providerController.getProvider);

router.route('/:id').patch( ProviderValidation.updateProvider(), handleValidation, providerController.updateProvider);

router.route('/:id').delete(ProviderValidation.params(), handleValidation, providerController.deleteProvider);




export default router;


