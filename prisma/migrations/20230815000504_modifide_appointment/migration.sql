/*
  Warnings:

  - Added the required column `totalPrice` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Appointment_customer_id_fkey` ON `appointment`;

-- AlterTable
ALTER TABLE `appointment` ADD COLUMN `duration` VARCHAR(191) NULL,
    ADD COLUMN `startTime` DATETIME(3) NULL,
    ADD COLUMN `totalPrice` DOUBLE NOT NULL;
