/*
  Warnings:

  - Added the required column `delivery_address` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order" ADD COLUMN     "delivery_address" TEXT NOT NULL;
