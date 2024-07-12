import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
require("dotenv").config();

async function main() {
    // Create statuses
    const createdStatus = await prisma.status.create({
        data: { name: 'Created' },
    });
    const preparedStatus = await prisma.status.create({
        data: { name: 'Prepared' },
    });
    const shippedStatus = await prisma.status.create({
        data: { name: 'Shipped' },
    });

    // Create products
    const products = await Promise.all([
        prisma.product.create({ data: { name: 'Product 1', quantity: 100, price: 10.99 } }),
        prisma.product.create({ data: { name: 'Product 2', quantity: 100, price: 15.99 } }),
        prisma.product.create({ data: { name: 'Product 3', quantity: 100, price: 20.99 } }),
        prisma.product.create({ data: { name: 'Product 4', quantity: 100, price: 12.99 } }),
        prisma.product.create({ data: { name: 'Product 5', quantity: 100, price: 50.99 } }),
    ]);

    // Create shipments
    await prisma.shipment.create({
        data: {
        shipmentId: Math.random().toString(16).slice(2),
        companyName: 'Shipping Company First',
        shipmentDate: new Date(),
        statusId: shippedStatus.id,
        products: {
            create: products.slice(0, 3).map(product => ({
            productId: product.id,
            quantity: product.quantity / 10,
            })),
        },
        },
    });

    await prisma.shipment.create({
        data: {
        shipmentId: Math.random().toString(16).slice(2),
        companyName: 'Shipping Company Second',
        shipmentDate: new Date(),
        statusId: createdStatus.id,
        products: {
            create: products.slice(2, 5).map(product => ({
            productId: product.id,
            quantity: product.quantity / 10,
            })),
        },
        },
    });
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
    await prisma.$disconnect();
});