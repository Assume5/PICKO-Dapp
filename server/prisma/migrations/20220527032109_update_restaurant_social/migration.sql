/*
  Warnings:

  - A unique constraint covering the columns `[restaurant_id]` on the table `restaurant_social` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "restaurant_social_restaurant_id_key" ON "restaurant_social"("restaurant_id");
