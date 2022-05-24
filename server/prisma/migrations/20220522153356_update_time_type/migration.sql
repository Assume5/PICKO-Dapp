/*
  Warnings:

  - You are about to drop the column `clost_time` on the `restaurant` table. All the data in the column will be lost.
  - Added the required column `city` to the `restaurant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `close_time` to the `restaurant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `full_address` to the `restaurant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `restaurant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zipcode` to the `restaurant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "restaurant" DROP COLUMN "clost_time",
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "close_time" TEXT NOT NULL,
ADD COLUMN     "full_address" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL,
ADD COLUMN     "zipcode" TEXT NOT NULL,
ALTER COLUMN "open_time" SET DATA TYPE TEXT;
