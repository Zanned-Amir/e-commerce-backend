import  { Router } from 'express';
import {  AuthController } from '../controllers/index';
import { handleValidation , Authenticated } from '../middlewares/index';



const router = Router();

const authController = new AuthController();
const authenticated = new Authenticated();
router.route('/register').post(authController.register);
router.route('/login').post(authController.login);
router.route('/login/2fa').post(authController.login2fa);
router.route('/login/2fa/generate').post(authController.get2fa);


router.route('/refresh-token').post(authController.refreshToken);
router.route('/logout').post(authenticated.protect, authController.logout);
router.route('/logout-all').post(authenticated.protect, authController.logoutAll);
router.route('/2fa/generate').post(authenticated.protect, authController.generate2fa);
router.route('/2fa/validate').post(authenticated.protect, authController.validate2fa);
router.route('/2fa/disable').post(authenticated.protect, authController.disable2fa);
router.route('/2fa/enable').post(authenticated.protect, authController.enable2fa);


router.route('/reset-password').post(authController.resetPassword);
router.route('/change-password/:token').post(authController.changePassword);
router.route('/verify-email').post(authController.generateVerificationEmail);
router.route('/verify-email/:token/:id').patch(authController.verifyEmail);


export default router;