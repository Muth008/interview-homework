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
    return await this.prisma.product.create({
      data: productData,
    });
  }

  async updateProduct(productData: Product) {
    return await this.prisma.product.update({
      where: { id: productData.id },
      data: productData,
    });
  }

  async deleteProduct(id: Product['id']) {
    return await this.prisma.product.delete({
      where: { id },
    });
  }
}

export default ProductDAO;
