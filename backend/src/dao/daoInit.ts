import { prisma } from "../prisma/prismaClient";
import ProductDAO from "./product.dao";
import ShipmentDAO from "./shipment.dao";
import StatusDAO from "./status.dao";

export const productDAO = new ProductDAO(prisma);
export const shipmentDAO = new ShipmentDAO(prisma);
export const statusDAO = new StatusDAO(prisma);