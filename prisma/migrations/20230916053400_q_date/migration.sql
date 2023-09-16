/*
  Warnings:

  - You are about to alter the column `start_date` on the `qualification` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - You are about to alter the column `end_date` on the `qualification` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.

*/
-- AlterTable
ALTER TABLE `qualification` MODIFY `start_date` DATETIME(3) NULL,
    MODIFY `end_date` DATETIME(3) NULL;
