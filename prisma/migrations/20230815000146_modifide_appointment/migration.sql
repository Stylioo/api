/*
  Warnings:

  - You are about to drop the column `employee_id` on the `appointment` table. All the data in the column will be lost.
  - You are about to drop the `_appointmenttoservice` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `beautician` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `beautician_id` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customer` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `services` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_appointmenttoservice` DROP FOREIGN KEY `_AppointmentToService_A_fkey`;

-- DropForeignKey
ALTER TABLE `_appointmenttoservice` DROP FOREIGN KEY `_AppointmentToService_B_fkey`;

-- DropForeignKey
ALTER TABLE `appointment` DROP FOREIGN KEY `Appointment_customer_id_fkey`;

-- DropForeignKey
ALTER TABLE `appointment` DROP FOREIGN KEY `Appointment_employee_id_fkey`;

-- AlterTable
ALTER TABLE `appointment` DROP COLUMN `employee_id`,
    ADD COLUMN `beautician` VARCHAR(191) NOT NULL,
    ADD COLUMN `beautician_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `customer` VARCHAR(191) NOT NULL,
    ADD COLUMN `services` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `_appointmenttoservice`;
