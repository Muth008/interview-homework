import express from 'express';

const router = express.Router();

/**
 * @openapi
 * /api/health/:
 *   get:
 *     tags:
 *     - Health
 *     summary: Health check
 *     description: Check if api is running.
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Internal server error
 */
router.get('/', (req, res) => {
    res.status(200).send('OK');
});

export default router;