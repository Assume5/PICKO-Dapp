/*
  Warnings:

  - Added the required column `hero_image` to the `restaurant_hero` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "restaurant_hero" ADD COLUMN     "hero_image" TEXT NOT NULL;
