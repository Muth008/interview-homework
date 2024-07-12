-- CreateTable
CREATE TABLE `product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(191) NULL,
    `imageUrl` VARCHAR(191) NULL,
    `quantity` INTEGER NOT NULL,
    `price` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `shipment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `shipmentId` VARCHAR(191) NOT NULL,
    `companyName` VARCHAR(191) NOT NULL,
    `shipmentDate` DATETIME(3) NOT NULL,
    `statusId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `shipment_shipmentId_key`(`shipmentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product_shipment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productId` INTEGER NOT NULL,
    `shipmentId` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,

    INDEX `idx_product_shipment_productId`(`productId`),
    INDEX `idx_product_shipment_shipmentId`(`shipmentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `status` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `shipment` ADD CONSTRAINT `shipment_statusId_fkey` FOREIGN KEY (`statusId`) REFERENCES `status`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_shipment` ADD CONSTRAINT `product_shipment_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_shipment` ADD CONSTRAINT `product_shipment_shipmentId_fkey` FOREIGN KEY (`shipmentId`) REFERENCES `shipment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
