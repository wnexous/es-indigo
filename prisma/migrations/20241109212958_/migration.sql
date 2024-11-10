/*
  Warnings:

  - You are about to drop the column `proofsId` on the `courses` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `courses` DROP FOREIGN KEY `courses_proofsId_fkey`;

-- AlterTable
ALTER TABLE `courses` DROP COLUMN `proofsId`;

-- CreateTable
CREATE TABLE `enrolled` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `coursesId` VARCHAR(191) NOT NULL,
    `proofId` VARCHAR(191) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `enrolled_id_userId_coursesId_key`(`id`, `userId`, `coursesId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `enrolled` ADD CONSTRAINT `enrolled_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `enrolled` ADD CONSTRAINT `enrolled_coursesId_fkey` FOREIGN KEY (`coursesId`) REFERENCES `courses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `enrolled` ADD CONSTRAINT `enrolled_proofId_fkey` FOREIGN KEY (`proofId`) REFERENCES `proofs`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
