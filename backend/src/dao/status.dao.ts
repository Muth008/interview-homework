import { PrismaClient } from '@prisma/client';
import { Status } from '../models/status.model';

class StatusDAO {
  private prisma: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prisma = prismaClient;
  }

  async getAllStatuses() {
    return await this.prisma.status.findMany();
  }

  async listStatuses(statusData: Status) {
    return await this.prisma.status.findMany({
      where: statusData,
    });
  }

  async getStatusById(id: number) {
    return await this.prisma.status.findUnique({
      where: { id },
    });
  }

  async createStatus(statusData: Status) {
    return await this.prisma.status.create({
      data: statusData,
    });
  }

  async updateStatus(statusData: Status) {
    return await this.prisma.status.update({
      where: { id: statusData.id },
      data: statusData,
    });
  }

  async deleteStatus(id: number) {
    return await this.prisma.status.delete({
      where: { id },
    });
  }
}

export default StatusDAO;