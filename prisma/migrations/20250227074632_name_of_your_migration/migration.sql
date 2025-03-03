/*
  Warnings:

  - Added the required column `city` to the `Destination` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `destination` ADD COLUMN `city` VARCHAR(191) NOT NULL;
