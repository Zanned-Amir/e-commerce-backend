import { Router } from 'express';
import { ReviewController } from '../controllers/index';
import { handleValidation, ReviewValidation } from '../middlewares/index';
import { Authenticated } from '../middlewares/index';
import authorize from '../middlewares/authorize';

const router = Router();

const reviewController = new ReviewController();
const authenticated = new Authenticated();

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: Review operations
 */

/**
 * @swagger
 * /reviews/count:
 *   get:
 *     summary: Get the count of reviews
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The count of reviews
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   description: The total number of reviews.
 *                   example: 150
 */
router.route('/count')
  .get(authenticated.protect, authorize('admin'), reviewController.countReviews);

/**
 * @swagger
 * /reviews:
 *   get:
 *     summary: Retrieve all reviews
 *     tags: [Reviews]
 *     parameters:
 *       - in: query
 *         name: pop
 *         schema:
 *           type: boolean
 *         description: Whether to populate related fields
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of reviews per page
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of reviews
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
 *                     $ref: '#/components/schemas/Review'
 *       401:
 *         description: Unauthorized
 */
router.route('/')
  .get(authenticated.protect, ReviewValidation.query(), handleValidation, reviewController.getAllReviews)
  .post(
    authenticated.protect,
    ReviewValidation.createReview(),
    handleValidation,  reviewController.createReview
);

    /**
     * @swagger
     * /reviews:
     *   post:
     *     summary: Create a new review
     *     tags: [Reviews]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               rating:
     *                 type: integer
     *                 description: Rating of the review
     *               comment:
     *                 type: string
     *                 description: Comment of the review
     *               productId:
     *                 type: string
     *                 description: The ID of the related product
     *             required:
     *               - rating
     *               - comment
     *               - productId
     *     responses:
     *       201:
     *         description: Review created successfully
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
     *                   $ref: '#/components/schemas/Review'
     *       400:
     *         description: Bad request
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Server error
     */
  
/**
 * @swagger
 * /reviews/{id}:
 *   get:
 *     summary: Retrieve a review by ID
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the review
 *       - in: query
 *         name: pop
 *         schema:
 *           type: boolean
 *         description: Whether to populate related fields
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The requested review
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       404:
 *         description: Review not found
 *       401:
 *         description: Unauthorized
 *   patch:
 *     summary: Update a review by ID
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the review
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       200:
 *         description: The updated review
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Review not found
 *       401:
 *         description: Unauthorized
 *   delete:
 *     summary: Delete a review by ID
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the review
 *     responses:
 *       204:
 *         description: Review deleted successfully
 *       404:
 *         description: Review not found
 *       401:
 *         description: Unauthorized
 */
router.route('/:id')
  .get(authenticated.protect, ReviewValidation.params(), handleValidation, reviewController.getReview)
  .patch(authenticated.protect, authorize('admin'), ReviewValidation.updateReview(), handleValidation, reviewController.updateReview)
  .delete(authenticated.protect, authorize('admin'), ReviewValidation.params(), handleValidation, reviewController.deleteReview);

/**
 * @swagger
 * /reviews/{id}/hide:
 *   patch:
 *     summary: Hide a review by ID
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the review
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The hidden review
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 */
router.route('/:id/hide')
  .patch(authenticated.protect, authorize('admin'), ReviewValidation.params(), handleValidation, reviewController.hideReview);

/**
 * @swagger
 * /reviews/{id}/show:
 *   patch:
 *     summary: Show a review by ID
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the review
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The shown review
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 */
router.route('/:id/show')
  .patch(authenticated.protect, authorize('admin'), ReviewValidation.params(), handleValidation, reviewController.showReview);

export default router;
