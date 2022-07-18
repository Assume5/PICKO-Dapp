/*
  Warnings:

  - Added the required column `restaurant_id` to the `cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `restaurant_id` to the `guest_cart` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "guest_cart" DROP CONSTRAINT "guest_cart_guest_cooke_value_fkey";

-- DropForeignKey
ALTER TABLE "restaurant_hero" DROP CONSTRAINT "restaurant_hero_restaurant_id_fkey";

-- AlterTable
ALTER TABLE "cart" ADD COLUMN     "restaurant_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "guest_cart" ADD COLUMN     "restaurant_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "guest_cart" ADD CONSTRAINT "guest_cart_guest_cooke_value_fkey" FOREIGN KEY ("guest_cooke_value") REFERENCES "guest"("cookie_value") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "restaurant_hero" ADD CONSTRAINT "restaurant_hero_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
