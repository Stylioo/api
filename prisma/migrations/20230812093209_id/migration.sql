/*
  Warnings:

  - The primary key for the `appointment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `service` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `_appointmenttoservice` DROP FOREIGN KEY `_AppointmentToService_A_fkey`;

-- DropForeignKey
ALTER TABLE `_appointmenttoservice` DROP FOREIGN KEY `_AppointmentToService_B_fkey`;

-- AlterTable
ALTER TABLE `_appointmenttoservice` MODIFY `A` VARCHAR(191) NOT NULL,
    MODIFY `B` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `appointment` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `service` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `_AppointmentToService` ADD CONSTRAINT `_AppointmentToService_A_fkey` FOREIGN KEY (`A`) REFERENCES `Appointment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AppointmentToService` ADD CONSTRAINT `_AppointmentToService_B_fkey` FOREIGN KEY (`B`) REFERENCES `Service`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
