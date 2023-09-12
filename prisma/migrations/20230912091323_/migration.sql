/*
  Warnings:

  - You are about to drop the column `startTime` on the `appointment` table. All the data in the column will be lost.
  - You are about to drop the column `totalPrice` on the `appointment` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `leaverequest` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `leaverequest` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `leaverequest` table. All the data in the column will be lost.
  - Added the required column `total_price` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end_date` to the `LeaveRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_date` to the `LeaveRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `LeaveRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `appointment` DROP COLUMN `startTime`,
    DROP COLUMN `totalPrice`,
    ADD COLUMN `start_time` VARCHAR(191) NULL,
    ADD COLUMN `total_price` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `leaverequest` DROP COLUMN `createdAt`,
    DROP COLUMN `endDate`,
    DROP COLUMN `startDate`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `end_date` DATETIME(3) NOT NULL,
    ADD COLUMN `start_date` DATETIME(3) NOT NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL;
