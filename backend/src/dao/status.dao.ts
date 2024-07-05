import { PrismaClient } from '@prisma/client';
import { Status } from '../models/status.model';

/**
 * Data Access Object for Status
 * Contains methods used to interact with the status table in the database
 */
class StatusDAO {
    private prisma: PrismaClient;

    constructor(prismaClient: PrismaClient) {
        this.prisma = prismaClient;
    }

    /**
     * Get all statuses
     */
    async getAllStatuses() {
        return await this.prisma.status.findMany();
    }

    /**
     * List statuses based on input criteria
     */
    async listStatuses(statusData: Partial<Status>) {
        return await this.prisma.status.findMany({
            where: statusData,
        });
    }

    /**
     * Get status by ID
     */
    async getStatusById(id: number) {
        return await this.prisma.status.findUnique({
            where: { id },
        });
    }

    /**
     * Create a new status
     */
    async createStatus(statusData: Status) {
        return await this.prisma.status.create({
            data: statusData,
        });
    }

    /**
     * Update an existing status
     */
    async updateStatus(statusData: Status) {
        const { id, ...updateData } = statusData;

        return await this.prisma.status.update({
            where: { id },
            data: updateData,
        });
    }

    /**
     * Delete a status
     */
    async deleteStatus(id: number) {
        return await this.prisma.status.delete({
            where: { id },
        });
    }
}

export default StatusDAO;