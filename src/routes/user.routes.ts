import { Router } from 'express';
import { UserController } from '../controllers/index';
import { UserValidation } from '../middlewares/index';
import { handleValidation } from '../middlewares/index';
import { Authenticated } from '../middlewares/index';
import authorize from '../middlewares/authorize';

const router = Router();
const userController = new UserController();
const authenticated = new Authenticated();

router.route('/count')
  .get(authenticated.protect, authorize('admin'), userController.countUsers);

router.route('/current')
  .get(authenticated.protect, userController.getCurrentUser);

router.route('/')
  .get(authenticated.protect,authorize('admin'), UserValidation.query(), handleValidation, userController.getAllUsers)
  .post(authenticated.protect, authorize('admin'), UserValidation.createUser(), handleValidation, userController.createUser);

router.route('/:id')
  .get(authenticated.protect, UserValidation.params(), handleValidation, userController.getUser);

router.use(authenticated.protect, authorize('admin'));

router.route('/:id')
  .patch(UserValidation.updateUser(), handleValidation, userController.updateUser)
  .delete(UserValidation.params(), handleValidation, userController.deleteUser);

router.route('/:id/deactivate')
  .patch(UserValidation.params(), handleValidation, userController.deactivateUser);

router.route('/:id/activate')
  .patch(UserValidation.params(), handleValidation, userController.activateUser);

export default router;
