/*
  Warnings:

  - You are about to alter the column `salutation` on the `employee` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `employee` MODIFY `salutation` VARCHAR(191) NULL DEFAULT 'NONE';
