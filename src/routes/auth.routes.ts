import  { Router } from 'express';
import {  AuthController } from '../controllers/index';
import { handleValidation , Authenticated } from '../middlewares/index';



const router = Router();

const authController = new AuthController();
const authenticated = new Authenticated();
router.route('/register').post(authController.register);
router.route('/login').post(authController.login);

export default router;