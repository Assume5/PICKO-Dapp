/*
  Warnings:

  - Added the required column `menu_name` to the `order_details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `order_details` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order_details" ADD COLUMN     "menu_name" TEXT NOT NULL,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;
