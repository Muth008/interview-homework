import express from "express";
import listStatuss from "../services/status/list.service";
import getStatus from "../services/status/get.service";
import createStatus from "../services/status/create.service";
import updateStatus from "../services/status/update.service";
import deleteStatus from "../services/status/delete.service";

const router = express.Router();

/**
 * @openapi
 * /api/status/list:
 *   post:
 *     tags:
 *     - Status
 *     summary: Lists all statuss
 *     description: Retrieve a list of all statuss from the database based on input filter data.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Status'
 *     responses:
 *       200:
 *         description: A list of statuss.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Status'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/ValidationError'
 *       500:
 *         description: Internal server error
 */
router.post("/list", async (req, res) => {
    await listStatuss(req, res);
});

/**
 * @openapi
 * /api/status/:
 *   get:
 *     tags:
 *     - Status
 *     summary: Get a status
 *     description: Retrieve a single status by its ID from the database.
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: The status's ID.
 *     responses:
 *       200:
 *         description: A single status.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Status'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       404:
 *         description: Status not found
 *       500:
 *         description: Internal server error
 */
router.get("/", async (req, res) => {
    await getStatus(req, res);
});

/**
 * @openapi
 * /api/status/:
 *   post:
 *     tags:
 *     - Status
 *     summary: Create a status
 *     description: Create a new status in the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Status'
 *     responses:
 *       200:
 *         description: The created status.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Status'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       500:
 *         description: Internal server error
 */
router.post("/", async (req, res) => {
    await createStatus(req, res);
});

/**
 * @openapi
 * /api/status/:
 *   put:
 *     tags:
 *     - Status
 *     summary: Update a status
 *     description: Update an existing status in the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PutStatusInput'
 *     responses:
 *       200:
 *         description: The updated status.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Status'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       404:
 *        description: Status not found
 *       500:
 *         description: Internal server error
 */
router.put("/", async (req, res) => {
    await updateStatus(req, res);
});

/**
 * @openapi
 * /api/status/:
 *   delete:
 *     tags:
 *     - Status
 *     summary: Delete a status
 *     description: Delete a status from the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            properties:
 *             id:
 *              type: number
 *           required:
 *            - id
 *     responses:
 *       200:
 *         description: The deleted status.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Status'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       404:
 *         description: Status not found
 *       500:
 *         description: Internal server error
 */
router.delete("/", async (req, res) => {
    await deleteStatus(req, res);
});

export default router;

/**
 * @openapi
 * components:
 *   schemas:
 *     Status:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *         name:
 *           type: string
 *       required:
 *        - name
 *     PutProductInput:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *         name:
 *           type: string
 *       required:
 *        - id
 *        - name
 *       description: Parameter of product used to update status.
 */