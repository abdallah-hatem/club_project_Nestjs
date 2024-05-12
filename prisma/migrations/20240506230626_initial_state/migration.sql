/*
  Warnings:

  - You are about to drop the `Cart` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CartItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Colors` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SizeToColors` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Sizes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ColorsToSizeToColors` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_userId_fkey";

-- DropForeignKey
ALTER TABLE "CartItem" DROP CONSTRAINT "CartItem_cartId_fkey";

-- DropForeignKey
ALTER TABLE "CartItem" DROP CONSTRAINT "CartItem_colorsId_fkey";

-- DropForeignKey
ALTER TABLE "CartItem" DROP CONSTRAINT "CartItem_productId_fkey";

-- DropForeignKey
ALTER TABLE "CartItem" DROP CONSTRAINT "CartItem_sizesId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "SizeToColors" DROP CONSTRAINT "SizeToColors_productId_fkey";

-- DropForeignKey
ALTER TABLE "SizeToColors" DROP CONSTRAINT "SizeToColors_sizeId_fkey";

-- DropForeignKey
ALTER TABLE "_ColorsToSizeToColors" DROP CONSTRAINT "_ColorsToSizeToColors_A_fkey";

-- DropForeignKey
ALTER TABLE "_ColorsToSizeToColors" DROP CONSTRAINT "_ColorsToSizeToColors_B_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';

-- DropTable
DROP TABLE "Cart";

-- DropTable
DROP TABLE "CartItem";

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "Colors";

-- DropTable
DROP TABLE "Product";

-- DropTable
DROP TABLE "SizeToColors";

-- DropTable
DROP TABLE "Sizes";

-- DropTable
DROP TABLE "_ColorsToSizeToColors";

-- CreateTable
CREATE TABLE "Activity" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Working_schedule" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "from" TIMESTAMP(3) NOT NULL,
    "to" TIMESTAMP(3) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "activity_id" INTEGER NOT NULL,

    CONSTRAINT "Working_schedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activity_reservation" (
    "id" SERIAL NOT NULL,
    "from" TIMESTAMP(3) NOT NULL,
    "to" TIMESTAMP(3) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "activity_id" INTEGER NOT NULL,

    CONSTRAINT "Activity_reservation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Working_schedule" ADD CONSTRAINT "Working_schedule_activity_id_fkey" FOREIGN KEY ("activity_id") REFERENCES "Activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity_reservation" ADD CONSTRAINT "Activity_reservation_activity_id_fkey" FOREIGN KEY ("activity_id") REFERENCES "Activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
