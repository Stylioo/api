/*
  Warnings:

  - You are about to alter the column `type` on the `employee` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.
  - You are about to drop the `customer_auth` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `employee_auth` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[contact_no]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `password` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contact_no` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `customer_auth` DROP FOREIGN KEY `Customer_Auth_uid_fkey`;

-- DropForeignKey
ALTER TABLE `employee_auth` DROP FOREIGN KEY `Employee_Auth_uid_fkey`;

-- AlterTable
ALTER TABLE `customer` ADD COLUMN `password` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `employee` ADD COLUMN `address_line_1` VARCHAR(191) NULL,
    ADD COLUMN `address_line_2` VARCHAR(191) NULL,
    ADD COLUMN `city` VARCHAR(191) NULL,
    ADD COLUMN `contact_no` VARCHAR(191) NOT NULL,
    ADD COLUMN `district` VARCHAR(191) NULL,
    ADD COLUMN `password` VARCHAR(191) NOT NULL,
    MODIFY `type` ENUM('ADMIN', 'MANAGER', 'BEAUTICIAN', 'RECEPTIONIST') NOT NULL;

-- DropTable
DROP TABLE `customer_auth`;

-- DropTable
DROP TABLE `employee_auth`;

-- CreateTable
CREATE TABLE `_AppointmentToService` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_AppointmentToService_AB_unique`(`A`, `B`),
    INDEX `_AppointmentToService_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Employee_contact_no_key` ON `Employee`(`contact_no`);

-- AddForeignKey
ALTER TABLE `_AppointmentToService` ADD CONSTRAINT `_AppointmentToService_A_fkey` FOREIGN KEY (`A`) REFERENCES `Appointment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AppointmentToService` ADD CONSTRAINT `_AppointmentToService_B_fkey` FOREIGN KEY (`B`) REFERENCES `Service`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
