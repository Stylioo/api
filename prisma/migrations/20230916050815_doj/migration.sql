/*
  Warnings:

  - You are about to alter the column `doj` on the `employee` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.

*/
-- AlterTable
ALTER TABLE `employee` MODIFY `doj` DATETIME(3) NULL;
