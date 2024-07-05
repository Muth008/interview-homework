import supertest from "supertest";
import app from "../../../app";
import { Product } from "../../../models/product.model";
import fs from 'fs';
import path from 'path';

describe('E2E Tests for Product API', () => {
    let productId: number;

    it('should create a new product and return it', async () => {
        const imagePath = path.resolve(__dirname, '../../image.png');
        if (!fs.existsSync(imagePath)) {
            throw new Error(`Image file does not exist at path: ${imagePath}`);
        }
    
        const response = await supertest(app)
            .post('/api/product/')
            .field('name', 'Test Product')
            .field('description', 'This is a test product')
            .field('quantity', '10')
            .field('price', '19.99')
            .attach('image', imagePath)
            .expect(200);
    
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('name', 'Test Product');
        productId = response.body.id;
    });

    it('should update the created product', async () => {
        const imagePath = path.resolve(__dirname, '../../image.png');
        if (!fs.existsSync(imagePath)) {
        throw new Error(`Image file does not exist at path: ${imagePath}`);
        }

        const updatedName = 'Updated Test Product';
        const response = await supertest(app)
            .put('/api/product/')
            .field('id', productId.toString())
            .field('name', updatedName)
            .field('description', 'This is an updated test product')
            .field('quantity', '20')
            .field('price', '29.99')
            .attach('image', imagePath)
            .expect(200);

        expect(response.body).toHaveProperty('name', updatedName);
    });

    it('should get the updated product', async () => {
        const response = await supertest(app)
            .get(`/api/product?id=${productId}`)
            .expect(200);

        expect(response.body).toHaveProperty('id', productId);
        expect(response.body).toHaveProperty('name', 'Updated Test Product');
    });

    it('should list all products including the updated one', async () => {
        const response = await supertest(app)
            .post('/api/product/list')
            .send({})
            .expect(200);

        const product = response.body.find((product: Product) => product.id === productId);
        expect(product).toBeDefined();
        expect(product.name).toBe('Updated Test Product');
    });

    it('should delete the updated product', async () => {
        await supertest(app)
            .delete(`/api/product?id=${productId}`)
            .expect(200);

        await supertest(app)
            .get(`/api/product?id=${productId}`)
            .expect(404);
    });

    it('should return 404 for non-existent product file', async () => {
        await supertest(app)
            .get('/api/product/uploads/non_existent_file.jpg')
            .expect(404);
    });

    it('should serve a product file', async () => {
        await supertest(app)
            .get('/api/product/uploads/image.png')
            .expect(200);
    });
});