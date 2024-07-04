import { PrismaClient } from '@prisma/client';
import { Product } from '../models/product.model';

class ProductDAO {
  private prisma: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prisma = prismaClient;
  }

  async getAllProducts() {
    return await this.prisma.product.findMany();
  }

  async listProducts(productData: Product) {
    return await this.prisma.product.findMany({
      where: productData,
    });
  }

  async getProductById(id: number) {
    return await this.prisma.product.findUnique({
      where: { id },
    });
  }

  async createProduct(productData: Product) {
    const { image, ...createData } = productData;

    return await this.prisma.product.create({
      data: createData,
    });
  }

  async updateProduct(productData: Product) {
    const { id, image, ...updateData } = productData;
    return await this.prisma.product.update({
      where: { id },
      data: updateData,
    });
  }

  async deleteProduct(id: number) {
    return await this.prisma.product.delete({
      where: { id },
    });
  }

  async incrementProductQuantity(id: number, quantity: number) {
    return await this.prisma.product.update({
      where: { id },
      data: { quantity: { increment: quantity } },
    });
  }

  async decrementProductQuantity(id: number, quantity: number) {
    return await this.prisma.product.update({
      where: { id },
      data: { quantity: { decrement: quantity } },
    });
  }
}

export default ProductDAO;
