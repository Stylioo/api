/*
  Warnings:

  - You are about to drop the column `stockId` on the `barcode` table. All the data in the column will be lost.
  - You are about to drop the column `supplierId` on the `stock` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `barcode` DROP FOREIGN KEY `barcode_stockId_fkey`;

-- DropForeignKey
ALTER TABLE `stock` DROP FOREIGN KEY `Stock_supplierId_fkey`;

-- AlterTable
ALTER TABLE `barcode` DROP COLUMN `stockId`,
    ADD COLUMN `stock_id` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `stock` DROP COLUMN `supplierId`,
    ADD COLUMN `supplier_id` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `barcode` ADD CONSTRAINT `barcode_stock_id_fkey` FOREIGN KEY (`stock_id`) REFERENCES `Stock`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Stock` ADD CONSTRAINT `Stock_supplier_id_fkey` FOREIGN KEY (`supplier_id`) REFERENCES `Supplier`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
