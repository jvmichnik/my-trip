-- CreateTable
CREATE TABLE "app_config" (
    "id" TEXT NOT NULL,
    "exchange" DECIMAL(9,3) NOT NULL,

    CONSTRAINT "app_config_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ride" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "data" TIMESTAMP(3) NOT NULL,
    "order" INTEGER NOT NULL,
    "cost" DECIMAL(9,2) NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ride_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "items" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cost" DECIMAL(9,2) NOT NULL,
    "bought" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "items_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_id_fkey" FOREIGN KEY ("id") REFERENCES "ride"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
