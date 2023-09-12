-- AlterTable
ALTER TABLE `employee` ADD COLUMN `leave_count` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `status` ENUM('ACTIVE', 'INACTIVE', 'SUSPENDED', 'RESIGNED', 'ON_LEAVE', 'WORKING', 'ON_BREAK') NOT NULL DEFAULT 'INACTIVE';

-- CreateTable
CREATE TABLE `LeaveRequest` (
    `id` VARCHAR(191) NOT NULL,
    `employee_id` VARCHAR(191) NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,
    `status` ENUM('PENDING', 'APPROVED', 'REJECTED') NOT NULL DEFAULT 'PENDING',
    `reason` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `LeaveRequest` ADD CONSTRAINT `LeaveRequest_employee_id_fkey` FOREIGN KEY (`employee_id`) REFERENCES `Employee`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;