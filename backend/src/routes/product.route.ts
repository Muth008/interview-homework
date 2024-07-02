import express from 'express';
import listProducts from '../services/product/list.service';
import getProduct from '../services/product/get.service';
import createProduct from '../services/product/create.service';
import updateProduct from '../services/product/update.service';
import deleteProduct from '../services/product/delete.service';

const router = express.Router();

/**
 * @openapi
 * /api/product/list:
 *   post:
 *     tags:
 *     - Product
 *     summary: Lists all products
 *     description: Retrieve a list of all products from the database based on input filter data.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: A list of products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/ValidationError'
 *       500:
 *         description: Internal server error
 */
router.post('/list', async (req, res) => {
  await listProducts(req, res);
});

/**
 * @openapi
 * /api/product/:
 *   get:
 *     tags:
 *     - Product
 *     summary: Get a product
 *     description: Retrieve a single product by its ID from the database.
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: The product's ID.
 *     responses:
 *       200:
 *         description: A single product.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
router.get('/', async (req, res) => {
  await getProduct(req, res);
});

/**
 * @openapi
 * /api/product/:
 *   post:
 *     tags:
 *     - Product
 *     summary: Create a product
 *     description: Create a new product in the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: The created product.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       500:
 *         description: Internal server error
 */
router.post('/', async (req, res) => {
  await createProduct(req, res);
});

/**
 * @openapi
 * /api/product/:
 *   put:
 *     tags:
 *     - Product
 *     summary: Update a product
 *     description: Update an existing product in the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PutProductInput'
 *     responses:
 *       200:
 *         description: The updated product.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       404:
 *        description: Product not found
 *       500:
 *         description: Internal server error
 */
router.put('/', async (req, res) => {
  await updateProduct(req, res);
});

/**
 * @openapi
 * /api/product/:
 *   delete:
 *     tags:
 *     - Product
 *     summary: Delete a product
 *     description: Delete a product from the database.
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
 *         description: The deleted product.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
router.delete('/', async (req, res) => {
  await deleteProduct(req, res);
});

export default router;

/**
 * @openapi
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         quantity:
 *           type: number
 *         price:
 *           type: number
 *       required:
 *        - name
 *        - quantity
 *        - price
 *     PutProductInput:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         quantity:
 *           type: number
 *         price:
 *           type: number
 *       required:
 *        - id
 *        - name
 *        - quantity
 *        - price 
 *       description: Parameter of product used to update products.
 */
