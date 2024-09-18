import { Router } from 'express';
import { UserController } from '../controllers/index';
import { handleValidation, UserValidation } from '../middlewares/index';
import { Authenticated } from '../middlewares/index';
import authorize from '../middlewares/authorize';

const router = Router();

const userController = new UserController();
const authenticated = new Authenticated();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Users management and operations
 */

/**
 * @swagger
 * /users/count:
 *   get:
 *     summary: Get the count of users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The count of users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   description: The total number of users.
 *                   example: 150
 */
router.route('/count')
  .get(authenticated.protect, authorize('admin'), userController.countUsers);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve all users
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of users per page
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: The status of the response
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 */
router.route('/')
  .get(authenticated.protect, UserValidation.query(), handleValidation, userController.getAllUsers)
  .post(
    authenticated.protect,
    UserValidation.createUser(),
    handleValidation,
    /**
     * @swagger
     * /users:
     *   post:
     *     summary: Create a new user
     *     tags: [Users]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *                 description: The name of the user
     *               email:
     *                 type: string
     *                 description: The email address of the user
     *               password:
     *                 type: string
     *                 description: The password for the user
     *               role:
     *                 type: string
     *                 description: The role of the user (e.g., admin, user)
     *             required:
     *               - name
     *               - email
     *               - password
     *               - role
     *     responses:
     *       201:
     *         description: User created successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: string
     *                   description: The status of the response
     *                   example: success
     *                 data:
     *                   $ref: '#/components/schemas/User'
     *       400:
     *         description: Bad request
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Server error
     */
    userController.createUser
  );

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retrieve a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The requested user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized
 *   patch:
 *     summary: Update a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The updated user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user
 *     responses:
 *       204:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized
 */
router.route('/:id')
  .get(authenticated.protect, UserValidation.params(), handleValidation, userController.getUser)
  .patch(authenticated.protect, authorize('admin'), UserValidation.updateUser(), handleValidation, userController.updateUser)
  .delete(authenticated.protect, authorize('admin'), UserValidation.params(), handleValidation, userController.deleteUser);

/**
 * @swagger
 * /users/{id}/deactivate:
 *   patch:
 *     summary: Deactivate a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The deactivated user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.route('/:id/deactivate')
  .patch(authenticated.protect, authorize('admin'), UserValidation.params(), handleValidation, userController.deactivateUser);

/**
 * @swagger
 * /users/{id}/activate:
 *   patch:
 *     summary: Activate a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The activated user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.route('/:id/activate')
  .patch(authenticated.protect, authorize('admin'), UserValidation.params(), handleValidation, userController.activateUser);

export default router;
