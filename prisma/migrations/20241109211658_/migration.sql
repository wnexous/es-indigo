/*
  Warnings:

  - Added the required column `proofsId` to the `courses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `courses` ADD COLUMN `proofsId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `courses` ADD CONSTRAINT `courses_proofsId_fkey` FOREIGN KEY (`proofsId`) REFERENCES `proofs`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
