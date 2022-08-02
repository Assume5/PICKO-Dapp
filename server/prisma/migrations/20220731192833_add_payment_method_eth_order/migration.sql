/*
  Warnings:

  - Added the required column `payment_method` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sub_total_eth` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order" ADD COLUMN     "payment_method" TEXT NOT NULL,
ADD COLUMN     "sub_total_eth" DOUBLE PRECISION NOT NULL;
