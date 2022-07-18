/*
  Warnings:

  - Added the required column `menu_name` to the `guest_cart` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "guest_cart" ADD COLUMN     "menu_name" TEXT NOT NULL;
