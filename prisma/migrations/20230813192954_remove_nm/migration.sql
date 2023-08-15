/*
  Warnings:

  - You are about to drop the `_appointmenttoservice` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_appointmenttoservice` DROP FOREIGN KEY `_AppointmentToService_A_fkey`;

-- DropForeignKey
ALTER TABLE `_appointmenttoservice` DROP FOREIGN KEY `_AppointmentToService_B_fkey`;

-- DropTable
DROP TABLE `_appointmenttoservice`;
