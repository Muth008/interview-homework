import { PrismaClient } from "@prisma/client";
import ProductDAO from "../dao/product.dao";
import { Shipmentproduct } from "../models/shipment.model";
import ShipmentDAO from "../dao/shipment.dao";

const prisma = new PrismaClient();
const productDAO = new ProductDAO(prisma);
const shipmentDAO = new ShipmentDAO(prisma);

// Update the quantity of products in the warehouse
export async function handleProductsQuantities(shipmentId: number, products?: Shipmentproduct[]) {
    const shipmentProducts = await shipmentDAO.getShipmentProducts(shipmentId);

    if (shipmentProducts) {
        incrementProductsQuantity(shipmentProducts);
    }

    if (products) {
        decrementProductsQuantity(products);
    }
}


export async function incrementProductsQuantity(products: Shipmentproduct[]) {
    for (const product of products) {
        await productDAO.incrementProductQuantity(product.productId, product.quantity);
    }
}

export async function decrementProductsQuantity(products: Shipmentproduct[]) {
    for (const product of products) {
        await productDAO.decrementProductQuantity(product.productId, product.quantity);
    }
}