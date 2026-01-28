/*
  Warnings:

  - You are about to drop the column `deliveryAddr` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `providerId` on the `orders` table. All the data in the column will be lost.
  - The `role` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `updatedAt` to the `cart` table without a default value. This is not possible if the table is not empty.
  - Made the column `categoryId` on table `meals` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `deliveryAddress` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `providerProfileId` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('CUSTOMER', 'PROVIDER', 'ADMIN');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'BLOCKED', 'SUSPENDED');

-- DropForeignKey
ALTER TABLE "meals" DROP CONSTRAINT "meals_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_providerId_fkey";

-- AlterTable
ALTER TABLE "cart" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "meals" ALTER COLUMN "categoryId" SET NOT NULL;

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "deliveryAddr",
DROP COLUMN "providerId",
ADD COLUMN     "deliveryAddress" TEXT NOT NULL,
ADD COLUMN     "providerProfileId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "role",
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'CUSTOMER',
DROP COLUMN "status",
ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE';

-- CreateTable
CREATE TABLE "OrderStatusHistory" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "status" "OrderStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OrderStatusHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "OrderStatusHistory_orderId_idx" ON "OrderStatusHistory"("orderId");

-- CreateIndex
CREATE INDEX "orders_providerProfileId_idx" ON "orders"("providerProfileId");

-- AddForeignKey
ALTER TABLE "meals" ADD CONSTRAINT "meals_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_providerProfileId_fkey" FOREIGN KEY ("providerProfileId") REFERENCES "provider_profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderStatusHistory" ADD CONSTRAINT "OrderStatusHistory_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
