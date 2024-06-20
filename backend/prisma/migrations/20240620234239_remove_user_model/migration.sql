/*
  Warnings:

  - You are about to drop the column `authorId` on the `Board` table. All the data in the column will be lost.
  - You are about to drop the column `authorId` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the `Comment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Like` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Board" DROP CONSTRAINT "Board_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_cardId_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_cardId_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_userId_fkey";

-- AlterTable
ALTER TABLE "Board" DROP COLUMN "authorId",
ADD COLUMN     "author" TEXT;

-- AlterTable
ALTER TABLE "Card" DROP COLUMN "authorId",
ADD COLUMN     "author" TEXT,
ADD COLUMN     "comments" TEXT[],
ADD COLUMN     "upvotes" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "Comment";

-- DropTable
DROP TABLE "Like";

-- DropTable
DROP TABLE "User";
