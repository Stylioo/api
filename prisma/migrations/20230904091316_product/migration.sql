/*
  Warnings:

  - You are about to drop the column `vloume` on the `product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `product` DROP COLUMN `vloume`,
    ADD COLUMN `volume` DOUBLE NULL,
    MODIFY `status` ENUM('IN_STOCK', 'OUT_STOCK', 'LOW_STOCK') NOT NULL DEFAULT 'OUT_STOCK';
