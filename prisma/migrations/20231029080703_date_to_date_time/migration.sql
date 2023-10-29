/*
  Warnings:

  - The primary key for the `_appointmenttoservice` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `my_row_id` on the `_appointmenttoservice` table. All the data in the column will be lost.
  - You are about to alter the column `date` on the `appointment` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - You are about to alter the column `start_time` on the `appointment` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.

*/
-- AlterTable
ALTER TABLE `_appointmenttoservice` DROP PRIMARY KEY,
    DROP COLUMN `my_row_id`;

-- AlterTable
ALTER TABLE `appointment` MODIFY `date` DATETIME(3) NOT NULL,
    MODIFY `start_time` DATETIME(3) NULL;
