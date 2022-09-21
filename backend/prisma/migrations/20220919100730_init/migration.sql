/*
  Warnings:

  - You are about to drop the column `expenseId` on the `owe` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "owe" DROP CONSTRAINT "owe_expenseId_fkey";

-- DropIndex
DROP INDEX "owe_userId1_userId2_expenseId_key";

-- AlterTable
ALTER TABLE "owe" DROP COLUMN "expenseId";
