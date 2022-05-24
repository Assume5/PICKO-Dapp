/*
  Warnings:

  - You are about to drop the column `image_url` on the `menu_category` table. All the data in the column will be lost.
  - You are about to drop the column `image_url` on the `menus` table. All the data in the column will be lost.
  - Added the required column `image` to the `menus` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "menu_category" DROP COLUMN "image_url",
ADD COLUMN     "image" TEXT;

-- AlterTable
ALTER TABLE "menus" DROP COLUMN "image_url",
ADD COLUMN     "image" TEXT NOT NULL;
