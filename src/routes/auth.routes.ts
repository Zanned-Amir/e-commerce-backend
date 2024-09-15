import  { Router } from 'express';
import {  AuthController } from '../controllers/index';
import { handleValidation , Authenticated } from '../middlewares/index';



const router = Router();

const authController = new AuthController();
const authenticated = new Authenticated();
router.route('/register').post(authController.register);
router.route('/login').post(authController.login);
router.route('/refresh-token').post(authController.refreshToken);
router.route('/logout').post(authenticated.protect, authController.logout);
router.route('/logout-all').post(authenticated.protect, authController.logoutAll);

export default router;