/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `customer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `driver` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `owner` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `menu_name` to the `cart` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cart" ADD COLUMN     "menu_name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "restaurant" ALTER COLUMN "menu_type" SET DEFAULT E'filter',
ALTER COLUMN "hero_type" SET DEFAULT E'image',
ALTER COLUMN "view_count" SET DEFAULT 0,
ALTER COLUMN "order_count" SET DEFAULT 0,
ALTER COLUMN "status" SET DEFAULT E'close';

-- CreateIndex
CREATE UNIQUE INDEX "customer_username_key" ON "customer"("username");

-- CreateIndex
CREATE UNIQUE INDEX "driver_username_key" ON "driver"("username");

-- CreateIndex
CREATE UNIQUE INDEX "owner_username_key" ON "owner"("username");
