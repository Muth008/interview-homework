import { PrismaClient } from '@prisma/client';
import { Shipment } from '../models/shipment.model';

/**
 * Data Access Object for Shipment
 * Contains methods used to interact with the shipment table in the database
 */
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

    /**
     * Get all shipments
     */
    async getAllShipments() {
        return await this.prisma.shipment.findMany({
            include: this.includeData
        });
    }

    /**
     * List shipments based on input criteria
     */
    async listShipments(shipmentData: Partial<Shipment>) {
        const { products, ...shipmentDetails } = shipmentData;
        
        return await this.prisma.shipment.findMany({
            where: shipmentDetails,
            include: this.includeData,
        });
    }

    /**
     * Get shipment by ID
     */
    async getShipmentById(id: number) {
        return await this.prisma.shipment.findUnique({
        where: { id },
            include: this.includeData,
        });
    }

    /**
     * Create a new shipment and creates product_shipment
     * entries if products are provided.
     */
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

    /**
     * Update an existing shipment and updates product_shipment
     * entries if products are provided.
     */
    async updateShipment(shipmentData: Shipment) {
        const { products, ...shipmentDetails } = shipmentData;
        const { id, ...updateShipmentData } = shipmentDetails;

        if (products && id) {
        await this.prisma.product_shipment.deleteMany({
            where: { shipmentId: id },
        });

        await this.prisma.product_shipment.createMany({
            data: products.map((productShipment) => ({
                ...productShipment,
                shipmentId: id,
            })),
        });
        }

        const shipment = await this.prisma.shipment.update({
            where: { id },
            data: updateShipmentData,
        });

        return shipment
    }

    /**
     * Delete a shipment and its associated product_shipment entries
     */
    async deleteShipment(id: number) {
        await this.prisma.product_shipment.deleteMany({
            where: { shipmentId: id },
        });

        return await this.prisma.shipment.delete({
            where: { id },
        });
    }

    /**
     * Get shipment products by shipmentId
     */
    async getShipmentProducts(shipmentId: number) {
        return await this.prisma.product_shipment.findMany({
            where: { shipmentId },
        });
    }
}

export default ShipmentDAO;