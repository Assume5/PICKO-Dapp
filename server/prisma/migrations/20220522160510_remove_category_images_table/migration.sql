/*
  Warnings:

  - You are about to drop the `menu_category_images` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "menu_category_images" DROP CONSTRAINT "menu_category_images_category_id_fkey";

-- AlterTable
ALTER TABLE "menu_category" ADD COLUMN     "image_url" TEXT;

-- DropTable
DROP TABLE "menu_category_images";
