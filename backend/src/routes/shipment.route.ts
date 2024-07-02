import express from "express";
import listShipments from "../services/shipment/list.service";
import getShipment from "../services/shipment/get.service";
import createShipment from "../services/shipment/create.service";
import updateShipment from "../services/shipment/update.service";
import deleteShipment from "../services/shipment/delete.service";

const router = express.Router();

/**
 * @openapi
 * /api/shipment/list:
 *   post:
 *     tags:
 *     - Shipment
 *     summary: Lists all shipments
 *     description: Retrieve a list of all shipments from the database based on input filter data.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Shipment'
 *     responses:
 *       200:
 *         description: A list of shipments.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Shipment'
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
    await listShipments(req, res);
});

/**
 * @openapi
 * /api/shipment/:
 *   get:
 *     tags:
 *     - Shipment
 *     summary: Get a shipment
 *     description: Retrieve a single shipment by its ID from the database.
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: The shipment's ID.
 *     responses:
 *       200:
 *         description: A single shipment.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Shipment'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       404:
 *         description: Shipment not found
 *       500:
 *         description: Internal server error
 */
router.get("/", async (req, res) => {
    await getShipment(req, res);
});

/**
 * @openapi
 * /api/shipment/:
 *   post:
 *     tags:
 *     - Shipment
 *     summary: Create a shipment
 *     description: Create a new shipment in the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ShipmentCreate'
 *     responses:
 *       200:
 *         description: The created shipment.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Shipment'
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
    await createShipment(req, res);
});

/**
 * @openapi
 * /api/shipment/:
 *   put:
 *     tags:
 *     - Shipment
 *     summary: Update a shipment
 *     description: Update an existing shipment in the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ShipmentUpdate'
 *     responses:
 *       200:
 *         description: The updated shipment.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Shipment'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       404:
 *        description: Shipment not found
 *       500:
 *         description: Internal server error
 */
router.put("/", async (req, res) => {
    await updateShipment(req, res);
});

/**
 * @openapi
 * /api/shipment/:
 *   delete:
 *     tags:
 *     - Shipment
 *     summary: Delete a shipment
 *     description: Delete a shipment from the database.
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: The shipment's ID to delete.
 *     responses:
 *       200:
 *         description: The deleted shipment.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Shipment'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       404:
 *         description: Shipment not found
 *       500:
 *         description: Internal server error
 */
router.delete("/", async (req, res) => {
    await deleteShipment(req, res);
});

export default router;

/**
 * @openapi
 * components:
 *   schemas:
 *     ShipmentCreate:
 *       type: object
 *       properties:
 *         companyName:
 *           type: string
 *           description: Name of the company associated with the shipment.
 *         shipmentDate:
 *           type: string
 *           description: Date when the shipment supposed to be send.
 *         statusId:
 *           type: number
 *           description: Identifier for the current status of the shipment.
 *         products:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ShipmentProduct'
 *           description: List of products included in the shipment.
 *       required:
 *         - companyName
 *         - shipmentDate
 *         - statusId
 *         - products
 *       additionalProperties: false
 *       description: Schema of shipment for create request.
 *     Shipment:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           description: Unique identifier for the shipment.
 *         companyName:
 *           type: string
 *           description: Name of the company associated with the shipment.
 *         shipmentId:
 *          type: string
 *          description: Unique identifier for the shipment.
 *         shipmentDate:
 *           type: string
 *           description: Date when the shipment supposed to be send.
 *         statusId:
 *           type: number
 *           description: Identifier for the current status of the shipment.
 *         createdAt:
 *          type: string
 *          description: Date when the shipment was created.
 *         updatedAt:
 *          type: string
 *          description: Date when the shipment was last updated.
 *         products:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ShipmentProduct'
 *           description: List of products included in the shipment.
 *       required:
 *         - id
 *         - companyName
 *         - shipmentDate
 *         - statusId
 *         - products
 *       additionalProperties: false
 *       description: Schema of shipment.
 *     ShipmentProduct:
 *       type: object
 *       properties:
 *         productId:
 *           type: number
 *           description: Unique identifier for the product.
 *         quantity:
 *           type: number
 *           description: Quantity of the product in the shipment.
 *       required:
 *         - productId
 *         - quantity
 *       additionalProperties: false
 *       description: Product details included in a shipment.
 *     ShipmentUpdate:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           description: Unique identifier for the shipment.
 *         companyName:
 *           type: string
 *           description: Name of the company associated with the shipment.
 *         shipmentDate:
 *           type: string
 *           description: Date when the shipment supposed to be send.
 *         statusId:
 *           type: number
 *           description: Identifier for the current status of the shipment.
 *         products:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ShipmentProduct'
 *           description: List of products included in the shipment.
 *       required:
 *         - id
 *         - companyName
 *         - shipmentDate
 *         - statusId
 *         - products
 *       additionalProperties: false
 *       description: Schema of shipment for update request.   
 */