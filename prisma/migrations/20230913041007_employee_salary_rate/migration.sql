-- AlterTable
ALTER TABLE `employee` ADD COLUMN `commission` DOUBLE NULL,
    ADD COLUMN `fixed_salary` DOUBLE NULL,
    ADD COLUMN `hourly_rate` DOUBLE NULL,
    ADD COLUMN `salutation` ENUM('NONE', 'MR', 'MS', 'MRS') NULL DEFAULT 'NONE',
    ADD COLUMN `working_hours_per_day` DOUBLE NULL;
