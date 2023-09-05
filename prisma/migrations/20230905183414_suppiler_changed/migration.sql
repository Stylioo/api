/*
  Warnings:

  - You are about to drop the column `price` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `supplierId` on the `product` table. All the data in the column will be lost.
  - Added the required column `unit_price` to the `Stock` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `barcode` DROP FOREIGN KEY `barcode_product_id_fkey`;

-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_supplierId_fkey`;

-- AlterTable
ALTER TABLE `barcode` ADD COLUMN `stockId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `price`,
    DROP COLUMN `supplierId`;

-- AlterTable
ALTER TABLE `stock` ADD COLUMN `supplierId` VARCHAR(191) NULL,
    ADD COLUMN `unit_price` DOUBLE NOT NULL;

-- AddForeignKey
ALTER TABLE `barcode` ADD CONSTRAINT `barcode_stockId_fkey` FOREIGN KEY (`stockId`) REFERENCES `Stock`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Stock` ADD CONSTRAINT `Stock_supplierId_fkey` FOREIGN KEY (`supplierId`) REFERENCES `Supplier`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
