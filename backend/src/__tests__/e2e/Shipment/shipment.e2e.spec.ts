import supertest from "supertest";
import app from "../../../app";
import { Shipment } from "../../../models/shipment.model";
import ProductDAO from "../../../dao/product.dao";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const productDAO = new ProductDAO(prisma);

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

describe('E2E Tests for Shipment API', () => {
    let shipmentId: number;
    let product1Id: number;
    let product2Id: number;
    let product3Id: number;

    beforeAll(async () => {
        // Create test products
        const product1 = await productDAO.createProduct({ name: 'Product 1', quantity: 100, price: 10 });
        const product2 = await productDAO.createProduct({ name: 'Product 2', quantity: 100, price: 20 });
        const product3 = await productDAO.createProduct({ name: 'Product 3', quantity: 100, price: 30 });
        product1Id = product1.id;
        product2Id = product2.id;
        product3Id = product3.id;
    });

    it('should create a new shipment and update product quantities', async () => {
        const newShipment = {
            companyName: 'Test Company',
            shipmentDate: '2024-07-10',
            statusId: 1,
            products: [
                { productId: product1Id, quantity: 5 },
                { productId: product2Id, quantity: 3 }
            ]
        };

        const response = await supertest(app)
            .post('/api/shipment/')
            .send(newShipment)
            .expect(200);

        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('companyName', 'Test Company');
        shipmentId = response.body.id;

        await delay(500); // Wait for the shipment to be processed

        // Check that product quantities have been updated
        const updatedProduct1 = await productDAO.getProductById(product1Id);
        const updatedProduct2 = await productDAO.getProductById(product2Id);

        expect(updatedProduct1?.quantity).toBe(95); // 100 - 5
        expect(updatedProduct2?.quantity).toBe(97); // 100 - 3
    });

    it('should update the created shipment and adjust product quantities', async () => {
        const updatedShipment = {
            id: shipmentId,
            companyName: 'Updated Test Company',
            shipmentDate: '2024-07-15',
            statusId: 2,
            products: [
                { productId: product1Id, quantity: 10 }, // Increased from 5
                { productId: product3Id, quantity: 2 }  // New product
            ]
        };

        const response = await supertest(app)
            .put('/api/shipment/')
            .send(updatedShipment)
            .expect(200);

        expect(response.body).toHaveProperty('companyName', 'Updated Test Company');

        await delay(500); // Wait for the shipment to be processed

        // Check that product quantities have been updated
        const updatedProduct1 = await productDAO.getProductById(product1Id);
        const updatedProduct2 = await productDAO.getProductById(product2Id);
        const updatedProduct3 = await productDAO.getProductById(product3Id);
        expect(updatedProduct1?.quantity).toBe(90); // 95 - 5 (additional)
        expect(updatedProduct2?.quantity).toBe(100); // 97 + 3 (removed from shipment)
        expect(updatedProduct3?.quantity).toBe(98); // 100 - 2 (added to shipment)
    });

    it('should get the updated shipment', async () => {
        const response = await supertest(app)
            .get(`/api/shipment?id=${shipmentId}`)
            .expect(200);

        expect(response.body).toHaveProperty('id', shipmentId);
        expect(response.body).toHaveProperty('companyName', 'Updated Test Company');
    });

    it('should list all shipments including the updated one', async () => {
        const response = await supertest(app)
            .post('/api/shipment/list')
            .send({})
            .expect(200);

        const shipment = response.body.find((shipment: Shipment) => shipment.id === shipmentId);
        expect(shipment).toBeDefined();
        expect(shipment.companyName).toBe('Updated Test Company');
    });

    it('should delete the updated shipment and restore product quantities', async () => {
        await supertest(app)
            .delete(`/api/shipment?id=${shipmentId}`)
            .expect(200);

        await delay(500); // Wait for the shipment to be processed

        // Check that product quantities have been restored
        const restoredProduct1 = await productDAO.getProductById(product1Id);
        const restoredProduct2 = await productDAO.getProductById(product2Id);
        const restoredProduct3 = await productDAO.getProductById(product3Id);
        expect(restoredProduct1?.quantity).toBe(100);
        expect(restoredProduct2?.quantity).toBe(100);
        expect(restoredProduct3?.quantity).toBe(100);

        await supertest(app)
            .get(`/api/shipment?id=${shipmentId}`)
            .expect(404);
    });

    it('should return 400 for invalid shipment data', async () => {
        const invalidShipment = {
            // Missing required fields
        };

        await supertest(app)
            .post('/api/shipment/')
            .send(invalidShipment)
            .expect(400);
    });

    it('should return 404 for non-existent shipment', async () => {
        await supertest(app)
            .get('/api/shipment?id=99999')
            .expect(404);
    });

    afterAll(async () => {
        // Clean up test products
        await productDAO.deleteProduct(product1Id);
        await productDAO.deleteProduct(product2Id);
        await productDAO.deleteProduct(product3Id);
        await prisma.$disconnect();
    });
});