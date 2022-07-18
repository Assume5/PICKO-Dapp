/*
  Warnings:

  - The primary key for the `cart` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `guest_cart` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `guest_cooke_value` on the `guest_cart` table. All the data in the column will be lost.
  - Added the required column `guest_cookie_value` to the `guest_cart` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "guest_cart" DROP CONSTRAINT "guest_cart_guest_cooke_value_fkey";

-- AlterTable
ALTER TABLE "cart" DROP CONSTRAINT "cart_pkey",
ADD CONSTRAINT "cart_pkey" PRIMARY KEY ("id", "customer_id", "menu_id");

-- AlterTable
ALTER TABLE "guest_cart" DROP CONSTRAINT "guest_cart_pkey",
DROP COLUMN "guest_cooke_value",
ADD COLUMN     "guest_cookie_value" TEXT NOT NULL,
ADD CONSTRAINT "guest_cart_pkey" PRIMARY KEY ("id", "guest_cookie_value", "menu_id");

-- AddForeignKey
ALTER TABLE "guest_cart" ADD CONSTRAINT "guest_cart_guest_cookie_value_fkey" FOREIGN KEY ("guest_cookie_value") REFERENCES "guest"("cookie_value") ON DELETE CASCADE ON UPDATE CASCADE;
