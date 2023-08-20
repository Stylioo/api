/*
  Warnings:

  - You are about to drop the `appointment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `customer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `employee` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `service` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `unregistered_customer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `appointment`;

-- DropTable
DROP TABLE `customer`;

-- DropTable
DROP TABLE `employee`;

-- DropTable
DROP TABLE `service`;

-- DropTable
DROP TABLE `unregistered_customer`;

-- CreateTable
CREATE TABLE `testTable` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `age` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
