import { PrismaClient } from '@prisma/client';
import { Shipment } from '../models/shipment.model';

class ShipmentDAO {
  private prisma: PrismaClient;
  private includeData = {
    products: {
      select: {
        productId: true,
        quantity: true,
      }
    }
  };

  constructor(prismaClient: PrismaClient) {
    this.prisma = prismaClient;
  }

  async getAllShipments() {
    return await this.prisma.shipment.findMany({
      include: this.includeData
    });
  }

  async listShipments(shipmentData: Shipment) {
    const { products, ...shipmentDetails } = shipmentData;
    
    return await this.prisma.shipment.findMany({
      where: shipmentDetails,
      include: this.includeData,
    });
  }

  async getShipmentById(id: number) {
    return await this.prisma.shipment.findUnique({
      where: { id },
      include: this.includeData,
    });
  }

  async createShipment(shipmentData: Shipment) {
    const { products, ...shipmentDetails } = shipmentData;

    const shipment = await this.prisma.shipment.create({
      data: shipmentDetails,
    });

    if (products) {
      await this.prisma.product_shipment.createMany({
        data: products.map((productShipment) => ({
          ...productShipment,
          shipmentId: shipment.id,
        })),
      });
    }

    return shipment;
  }

  async updateShipment(shipmentData: Shipment) {
    const { products, ...shipmentDetails } = shipmentData;

    if (products && shipmentData.id) {
      await this.prisma.product_shipment.deleteMany({
        where: { shipmentId: shipmentData.id },
      });

      await this.prisma.product_shipment.createMany({
        data: products.map((productShipment) => ({
          ...productShipment,
          shipmentId: shipmentData.id!,
        })),
      });
    }

    const shipment = await this.prisma.shipment.update({
      where: { id: shipmentData.id },
      data: shipmentDetails,
    });

    return shipment
  }

  async deleteShipment(id: number) {
    await this.prisma.product_shipment.deleteMany({
      where: { shipmentId: id },
    });

    return await this.prisma.shipment.delete({
      where: { id },
    });
  }
}

export default ShipmentDAO;