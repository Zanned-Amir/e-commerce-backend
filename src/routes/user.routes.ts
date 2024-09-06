import  { Router } from 'express';
import { UserController } from '../controllers/index';

const  router = Router();
const userController = new UserController();


router.route('/').get(userController.getAllUsers);

router.route('/').post(userController.createUser);

router.route('/:id').get(userController.getUser);

router.route('/:id').patch(userController.updateUser);

router.route('/:id').delete(userController.deleteUser);

router.route('/:id/deactivate').patch(userController.deactivateUser);

router.route('/:id/activate').patch(userController.activateUser);

export default router;