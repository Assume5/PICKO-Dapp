-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_driver_id_fkey";

-- AlterTable
ALTER TABLE "order" ALTER COLUMN "driver_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "driver"("id") ON DELETE SET NULL ON UPDATE CASCADE;
