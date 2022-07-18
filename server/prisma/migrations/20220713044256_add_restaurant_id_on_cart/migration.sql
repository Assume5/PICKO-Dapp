/*
  Warnings:

  - The primary key for the `cart` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `guest_cart` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "cart" DROP CONSTRAINT "cart_pkey",
ADD CONSTRAINT "cart_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "guest_cart" DROP CONSTRAINT "guest_cart_pkey",
ADD CONSTRAINT "guest_cart_pkey" PRIMARY KEY ("id");
