/*
  Warnings:

  - You are about to drop the column `address` on the `supplier` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `supplier` DROP COLUMN `address`,
    ADD COLUMN `address_line_1` VARCHAR(191) NULL,
    ADD COLUMN `address_line_2` VARCHAR(191) NULL;
