/*
  Warnings:

  - Added the required column `ride_id` to the `items` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "items" DROP CONSTRAINT "items_id_fkey";

-- AlterTable
ALTER TABLE "items" ADD COLUMN     "ride_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "ride" ADD COLUMN     "as_backup" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_ride_id_fkey" FOREIGN KEY ("ride_id") REFERENCES "ride"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
