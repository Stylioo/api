/*
  Warnings:

  - The primary key for the `login_credentials` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `login_credentials` DROP PRIMARY KEY,
    MODIFY `uid` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`uid`);

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    MODIFY `uid` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`uid`);
