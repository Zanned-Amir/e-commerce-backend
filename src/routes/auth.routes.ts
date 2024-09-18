import { Router } from 'express';
import { AuthController } from '../controllers/index';
import { Authenticated } from '../middlewares/index';

const router = Router();
const authController = new AuthController();
const authenticated = new Authenticated();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication and authorization operations
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with email and password.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               password_confirm:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 */
router.route('/register').post(authController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     description: Authenticate a user and return a token.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Bad request
 */
router.route('/login').post(authController.login);

/**
 * @swagger
 * /auth/login/2fa:
 *   post:
 *     summary: Login with 2FA
 *     description: Authenticate a user and require 2FA token if 2FA is enabled.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               totp:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Bad request
 */
router.route('/login/2fa').post(authController.login2fa);

/**
 * @swagger
 * /auth/login/2fa/generate:
 *   post:
 *     summary: Generate 2FA QR code
 *     description: Generate a QR code for 2FA setup.
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: QR code for 2FA
 *         content:
 *           image/png:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: Bad request
 */
router.route('/login/2fa/generate').post(authController.get2fa);

/**
 * @swagger
 * /auth/refresh-token:
 *   post:
 *     summary: Refresh token
 *     description: Refresh the JWT token.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 *       400:
 *         description: Bad request
 */
router.route('/refresh-token').post(authController.refreshToken);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout user
 *     description: Logout the user from the current session.
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: Successfully logged out
 *       401:
 *         description: Unauthorized
 */
router.route('/logout').post(authenticated.protect, authController.logout);

/**
 * @swagger
 * /auth/logout-all:
 *   post:
 *     summary: Logout from all devices
 *     description: Logout the user from all devices.
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: Successfully logged out from all devices
 *       401:
 *         description: Unauthorized
 */
router.route('/logout-all').post(authenticated.protect, authController.logoutAll);

/**
 * @swagger
 * /auth/2fa/generate:
 *   post:
 *     summary: Enable 2FA
 *     description: Enable 2FA for the user account.
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 2FA enabled successfully
 *       401:
 *         description: Unauthorized
 */
router.route('/2fa/generate').post(authenticated.protect, authController.generate2fa);

/**
 * @swagger
 * /auth/2fa/validate:
 *   post:
 *     summary: Validate 2FA token
 *     description: Validate the 2FA token provided by the user.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               totp:
 *                 type: string
 *     responses:
 *       200:
 *         description: 2FA token validated successfully
 *       400:
 *         description: Invalid token
 */
router.route('/2fa/validate').post(authenticated.protect, authController.validate2fa);

/**
 * @swagger
 * /auth/2fa/disable:
 *   post:
 *     summary: Disable 2FA
 *     description: Disable 2FA for the user account.
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 2FA disabled successfully
 *       401:
 *         description: Unauthorized
 */
router.route('/2fa/disable').post(authenticated.protect, authController.disable2fa);

/**
 * @swagger
 * /auth/2fa/enable:
 *   post:
 *     summary: Enable 2FA
 *     description: Enable 2FA for the user account.
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 2FA enabled successfully
 *       401:
 *         description: Unauthorized
 */
router.route('/2fa/enable').post(authenticated.protect, authController.enable2fa);

/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Request password reset
 *     description: Request a password reset email to be sent to the user.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset email sent
 *       400:
 *         description: Bad request
 */
router.route('/reset-password').post(authController.resetPassword);

/**
 * @swagger
 * /auth/change-password/{token}:
 *   post:
 *     summary: Change password
 *     description: Change the user's password using a reset token.
 *     tags: [Auth]
 *     parameters:
 *       - name: token
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       400:
 *         description: Bad request
 */
router.route('/change-password/:token').post(authController.changePassword);

/**
 * @swagger
 * /auth/verify-email:
 *   post:
 *     summary: Request email verification
 *     description: Send a verification email to the user.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Verification email sent
 *       400:
 *         description: Bad request
 */
router.route('/verify-email').post(authController.generateVerificationEmail);

/**
 * @swagger
 * /auth/verify-email/{token}/{id}:
 *   patch:
 *     summary: Verify email
 *     description: Verify the user's email using a token.
 *     tags: [Auth]
 *     parameters:
 *       - name: token
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Email verified successfully
 *       400:
 *         description: Bad request
 */
router.route('/verify-email/:token/:id').patch(authController.verifyEmail);

export default router;
