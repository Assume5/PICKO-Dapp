/*
  Warnings:

  - You are about to drop the column `guest_cookie_value` on the `guest_cart` table. All the data in the column will be lost.
  - Added the required column `customer_id` to the `guest_cart` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "guest_cart" DROP CONSTRAINT "guest_cart_guest_cookie_value_fkey";

-- AlterTable
ALTER TABLE "guest_cart" RENAME COLUMN "guest_cookie_value" TO "customer_id";

-- AddForeignKey
ALTER TABLE "guest_cart" ADD CONSTRAINT "guest_cart_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "guest"("cookie_value") ON DELETE CASCADE ON UPDATE CASCADE;
