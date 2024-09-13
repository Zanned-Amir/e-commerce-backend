import { Router } from 'express';
import { UserController } from '../controllers/index';
import { UserValidation } from '../middlewares/index';
import { handleValidation } from '../middlewares/index';
import { Authenticated } from '../middlewares/index';

const router = Router();
const userController = new UserController();
const authenticated = new Authenticated();

router.route('/count').get(userController.countUsers);

router.route('/current')
  .get(authenticated.protect, userController.getCurrentUser);

router.route('/')
  .get(UserValidation.query(), handleValidation, userController.getAllUsers)
  .post(UserValidation.createUser(), handleValidation, userController.createUser);

router.route('/:id')
  .get(UserValidation.params(), handleValidation, userController.getUser)
  .patch(UserValidation.updateUser(), handleValidation, userController.updateUser)
  .delete(UserValidation.params(), handleValidation, userController.deleteUser);

router.route('/:id/deactivate')
  .patch(UserValidation.params(), handleValidation, userController.deactivateUser);

router.route('/:id/activate')
  .patch(UserValidation.params(), handleValidation, userController.activateUser);

export default router;
