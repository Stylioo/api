/*
  Warnings:

  - You are about to drop the column `type` on the `employee` table. All the data in the column will be lost.
  - Added the required column `role` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `employee` DROP COLUMN `type`,
    ADD COLUMN `role` ENUM('ADMIN', 'MANAGER', 'BEAUTICIAN', 'RECEPTIONIST') NOT NULL;
