-- AlterTable
ALTER TABLE "order" ADD COLUMN     "destination_lat" DOUBLE PRECISION,
ADD COLUMN     "destination_long" DOUBLE PRECISION,
ADD COLUMN     "driver_lat" DOUBLE PRECISION,
ADD COLUMN     "driver_long" DOUBLE PRECISION,
ADD COLUMN     "restaurant_lat" DOUBLE PRECISION,
ADD COLUMN     "restaurant_long" DOUBLE PRECISION;
