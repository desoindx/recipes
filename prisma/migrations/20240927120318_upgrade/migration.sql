/*
  Warnings:

  - You are about to drop the column `weight` on the `Ingredient` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Step` table. All the data in the column will be lost.
  - Added the required column `slug` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ingredient" DROP COLUMN "weight";

-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Step" DROP COLUMN "title";
