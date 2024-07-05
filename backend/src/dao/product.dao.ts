import { PrismaClient } from '@prisma/client';
import { Product } from '../models/product.model';

/**
 * Data Access Object for Product
 * Contains methods used to interact with the product table in the database
 */
class ProductDAO {
    private prisma: PrismaClient;

    constructor(prismaClient: PrismaClient) {
        this.prisma = prismaClient;
    }

    /**
     * Get all products
     */
    async getAllProducts() {
        return await this.prisma.product.findMany();
    }

    /**
     * List products based on input criteria
     */
    async listProducts(productData: Partial<Product>) {
        return await this.prisma.product.findMany({
            where: productData,
        });
    }

    /**
     * Get product by ID
     */
    async getProductById(id: number) {
        return await this.prisma.product.findUnique({
            where: { id },
        });
    }

    /**
     * Create a new product
     */
    async createProduct(productData: Product) {
        const { image, ...createData } = productData;

        return await this.prisma.product.create({
            data: createData,
        });
    }

    /**
     * Update an existing product
     */
    async updateProduct(productData: Product) {
        const { id, image, ...updateData } = productData;
        return await this.prisma.product.update({
            where: { id },
            data: updateData,
        });
    }

    /**
     * Delete a product by ID
     */
    async deleteProduct(id: number) {
        return await this.prisma.product.delete({
            where: { id },
        });
    }

    /**
     * Increment product quantity by a specified amount
     */
    async incrementProductQuantity(id: number, quantity: number) {
        return await this.prisma.product.update({
            where: { id },
            data: { quantity: { increment: quantity } },
        });
    }

    /**
     * Decrement product quantity by a specified amount
     */
    async decrementProductQuantity(id: number, quantity: number) {
        return await this.prisma.product.update({
            where: { id },
            data: { quantity: { decrement: quantity } },
        });
    }
}

export default ProductDAO;
