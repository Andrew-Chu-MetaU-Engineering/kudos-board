/*
  Warnings:

  - Made the column `boardId` on table `Card` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_boardId_fkey";

-- AlterTable
ALTER TABLE "Card" ALTER COLUMN "boardId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
