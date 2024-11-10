/*
  Warnings:

  - You are about to drop the column `coursesId` on the `enrolled` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id,userId,courseId]` on the table `enrolled` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `courseId` to the `enrolled` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `enrolled` DROP FOREIGN KEY `enrolled_coursesId_fkey`;

-- DropIndex
DROP INDEX `enrolled_id_userId_coursesId_key` ON `enrolled`;

-- AlterTable
ALTER TABLE `enrolled` DROP COLUMN `coursesId`,
    ADD COLUMN `courseId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `enrolled_id_userId_courseId_key` ON `enrolled`(`id`, `userId`, `courseId`);

-- AddForeignKey
ALTER TABLE `enrolled` ADD CONSTRAINT `enrolled_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `courses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
