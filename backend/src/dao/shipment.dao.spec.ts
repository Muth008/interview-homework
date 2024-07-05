import { PrismaClient } from '@prisma/client';
import ShipmentDAO from './shipment.dao'; // Adjust the import path as necessary
import { Shipment } from '../models/shipment.model';

// Mock the Prisma Client
jest.mock('@prisma/client', () => {
    const originalModule = jest.requireActual('@prisma/client');

    return {
        __esModule: true,
        ...originalModule,
        PrismaClient: jest.fn().mockImplementation(() => ({
            shipment: {
                findMany: jest.fn(),
                findUnique: jest.fn(),
                create: jest.fn(),
                update: jest.fn(),
                delete: jest.fn(),
            },
            product_shipment: {
                createMany: jest.fn(),
                deleteMany: jest.fn(),
                findMany: jest.fn(),
            },
        })),
    };
});

describe('ShipmentDAO', () => {
    let dao: ShipmentDAO;
    let prisma: PrismaClient;

    const mockShipments: Shipment[] = [
        { id: 1, shipmentId: '001ID', companyName: 'Test Company', shipmentDate: '2025-01-01', statusId: 1,  products: [{ productId: 1, quantity: 10 }] },
    ];
    const mockProductShipments = [{ productId: 1, quantity: 10, shipmentId: 1 }];
    const mockIncludeData = {
        products: {
        select: {
            productId: true,
            quantity: true,
        }
        }
    };


    beforeEach(() => {
        prisma = new PrismaClient();
        dao = new ShipmentDAO(prisma);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should get all shipments', async () => {
        (prisma.shipment.findMany as jest.Mock).mockResolvedValue(mockShipments);

        const shipments = await dao.getAllShipments();
        expect(shipments).toEqual(mockShipments);
        expect(prisma.shipment.findMany).toHaveBeenCalledWith({
        include: {
            products: {
            select: {
                productId: true,
                quantity: true,
            },
            },
        },
        });
    });

    it('should get a shipment by id', async () => {
        const mockShipment = mockShipments[0];
        (prisma.shipment.findUnique as jest.Mock).mockResolvedValue(mockShipment);

        const shipment = await dao.getShipmentById(1);
        expect(shipment).toEqual(mockShipment);
        expect(prisma.shipment.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
        include: {
            products: {
            select: {
                productId: true,
                quantity: true,
            },
            },
        },
        });
    });

    it('should create a shipment', async () => {
        (prisma.shipment.create as jest.Mock).mockResolvedValue(mockShipments);

        const shipment = await dao.createShipment(mockShipments[0]);
        expect(shipment).toEqual(mockShipments);
        expect(prisma.shipment.create).toHaveBeenCalledWith({
            data: {
                id: 1,
                companyName: "Test Company",
                shipmentDate: "2025-01-01",
                shipmentId: "001ID",
                statusId: 1,
            },
          });
        expect(prisma.product_shipment.createMany).toHaveBeenCalled();
    });

    it('should list shipments based on criteria', async () => {
        (prisma.shipment.findMany as jest.Mock).mockResolvedValue([mockShipments]);

        const shipments = await dao.listShipments({ companyName: 'Test companyName' });
        expect(shipments).toEqual([mockShipments]);
        expect(prisma.shipment.findMany).toHaveBeenCalledWith({
            where: { companyName: 'Test companyName' },
            include: mockIncludeData,
        });
    });

    it('should update a shipment', async () => {
        (prisma.shipment.update as jest.Mock).mockResolvedValue(mockShipments);
        (prisma.product_shipment.deleteMany as jest.Mock).mockResolvedValue({});
        (prisma.product_shipment.createMany as jest.Mock).mockResolvedValue({});

        const updatedShipment = await dao.updateShipment(mockShipments[0]);
        expect(updatedShipment).toEqual(mockShipments);
        expect(prisma.product_shipment.deleteMany).toHaveBeenCalledWith({
            where: { shipmentId: mockShipments[0].id },
        });
        expect(prisma.product_shipment.createMany).toHaveBeenCalledWith({
            data: mockProductShipments.map(productShipment => ({
                ...productShipment,
                shipmentId: 1,
            })),
        });
        expect(prisma.shipment.update).toHaveBeenCalledWith({
            where: { id: mockShipments[0].id },
            data: {
                companyName: "Test Company",
                shipmentDate: "2025-01-01",
                shipmentId: "001ID",
                statusId: 1,
            },
        });
    });

    it('should delete a shipment', async () => {
        (prisma.product_shipment.deleteMany as jest.Mock).mockResolvedValue({});
        (prisma.shipment.delete as jest.Mock).mockResolvedValue({ id: 1 });

        const result = await dao.deleteShipment(1);
        expect(result).toEqual({ id: 1 });
        expect(prisma.product_shipment.deleteMany).toHaveBeenCalledWith({
            where: { shipmentId: 1 },
        });
        expect(prisma.shipment.delete).toHaveBeenCalledWith({
            where: { id: 1 },
        });
    });

    it('should get shipment products by shipmentId', async () => {
        (prisma.product_shipment.findMany as jest.Mock).mockResolvedValue(mockProductShipments);

        const products = await dao.getShipmentProducts(1);
        expect(products).toEqual(mockProductShipments);
        expect(prisma.product_shipment.findMany).toHaveBeenCalledWith({
            where: { shipmentId: 1 },
        });
    });
});