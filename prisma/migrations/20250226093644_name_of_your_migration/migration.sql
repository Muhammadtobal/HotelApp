/*
  Warnings:

  - You are about to drop the column `hotelId` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `payment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `payment` DROP FOREIGN KEY `Payment_hotelId_fkey`;

-- DropForeignKey
ALTER TABLE `payment` DROP FOREIGN KEY `Payment_userId_fkey`;

-- DropIndex
DROP INDEX `Payment_hotelId_fkey` ON `payment`;

-- DropIndex
DROP INDEX `Payment_userId_fkey` ON `payment`;

-- AlterTable
ALTER TABLE `payment` DROP COLUMN `hotelId`,
    DROP COLUMN `userId`;
