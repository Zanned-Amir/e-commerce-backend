import  { Router } from 'express';
import { ProviderController } from '../controllers/index';

const  router = Router();
const providerController = new ProviderController();

router.route('/').get(providerController.getAllProviders);

router.route('/').post(providerController.createProvider);

router.route('/:id').get(providerController.getProvider);

router.route('/:id').patch(providerController.updateProvider);

router.route('/:id').delete(providerController.deleteProvider);

router.route('/:id/count').patch(providerController.countProviders);


export default router;


