/*
  Warnings:

  - Added the required column `subscribtion_end_date` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "subscribtion_end_date" TIMESTAMP(3) NOT NULL;
