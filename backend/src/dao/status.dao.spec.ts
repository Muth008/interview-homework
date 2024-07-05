import StatusDAO from './status.dao';
import { PrismaClient } from '@prisma/client';

// Mock the Prisma Client
jest.mock('@prisma/client', () => {
    const originalModule = jest.requireActual('@prisma/client');

    return {
        __esModule: true,
        ...originalModule,
        PrismaClient: jest.fn().mockImplementation(() => ({
            status: {
            findMany: jest.fn(),
            findUnique: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            },
        })),
    };
});


describe('StatusDAO', () => {
    let dao: StatusDAO;
    let prisma: PrismaClient;

    beforeEach(() => {
        prisma = new PrismaClient();
        dao = new StatusDAO(prisma);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('getAllStatuses should retrieve all statuses', async () => {
        (prisma.status.findMany as jest.Mock).mockResolvedValue([]);
        await dao.getAllStatuses();
        expect(prisma.status.findMany).toHaveBeenCalledWith();
    });

    test('listStatuses should filter statuses based on provided criteria', async () => {
        const statusData = { name: 'Created' };
        (prisma.status.findMany as jest.Mock).mockResolvedValue([statusData]);
        const result = await dao.listStatuses(statusData);
        expect(prisma.status.findMany).toHaveBeenCalledWith({ where: statusData });
        expect(result).toContainEqual(statusData);
    });

    test('getStatusById should retrieve status by ID', async () => {
        const id = 1;
        (prisma.status.findUnique as jest.Mock).mockResolvedValue({ id, name: 'Created' });
        const result = await dao.getStatusById(id);
        expect(prisma.status.findUnique).toHaveBeenCalledWith({ where: { id } });
        expect(result).toEqual({ id, name: 'Created' });
    });

    test('createStatus should create a new status', async () => {
        const statusData = { name: 'Created' };
        (prisma.status.create as jest.Mock).mockResolvedValue(statusData);
        const result = await dao.createStatus(statusData);
        expect(prisma.status.create).toHaveBeenCalledWith({ data: statusData });
        expect(result).toEqual(statusData);
    });

    test('updateStatus should update an existing status', async () => {
        const statusData = { id: 1, name: 'Inactive' };
        (prisma.status.update as jest.Mock).mockResolvedValue(statusData);
        const result = await dao.updateStatus(statusData);
        expect(prisma.status.update).toHaveBeenCalledWith({
            where: { id: statusData.id },
            data: { name: statusData.name },
        });
        expect(result).toEqual(statusData);
    });

    test('deleteStatus should delete a status by ID', async () => {
        const id = 1;
        (prisma.status.delete as jest.Mock).mockResolvedValue({ id, name: 'Inactive' });
        const result = await dao.deleteStatus(id);
        expect(prisma.status.delete).toHaveBeenCalledWith({ where: { id } });
        expect(result).toEqual({ id, name: 'Inactive' });
    });
});