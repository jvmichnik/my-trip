/*
  Warnings:

  - The primary key for the `app_config` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `app_config` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `items` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `items` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `ride` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `ride` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "items" DROP CONSTRAINT "items_id_fkey";

-- AlterTable
ALTER TABLE "app_config" DROP CONSTRAINT "app_config_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "app_config_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "items" DROP CONSTRAINT "items_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "items_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "ride" DROP CONSTRAINT "ride_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "ride_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_id_fkey" FOREIGN KEY ("id") REFERENCES "ride"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
