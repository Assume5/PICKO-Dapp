/*
  Warnings:

  - Made the column `socket_cookie` on table `customer` required. This step will fail if there are existing NULL values in that column.
  - Made the column `socket_cookie` on table `driver` required. This step will fail if there are existing NULL values in that column.
  - Made the column `socket_cookie` on table `owner` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "customer" ALTER COLUMN "socket_cookie" SET NOT NULL;

-- AlterTable
ALTER TABLE "driver" ALTER COLUMN "socket_cookie" SET NOT NULL;

-- AlterTable
ALTER TABLE "owner" ALTER COLUMN "socket_cookie" SET NOT NULL;
