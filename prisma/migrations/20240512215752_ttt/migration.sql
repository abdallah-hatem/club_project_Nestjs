/*
  Warnings:

  - You are about to drop the column `date` on the `Working_schedule` table. All the data in the column will be lost.
  - Added the required column `field_id` to the `Activity_reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Activity_reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `day` to the `Working_schedule` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Day" AS ENUM ('SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT');

-- AlterTable
ALTER TABLE "Activity_reservation" ADD COLUMN     "field_id" INTEGER NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Working_schedule" DROP COLUMN "date",
ADD COLUMN     "day" "Day" NOT NULL;

-- CreateTable
CREATE TABLE "Field" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "activity_id" INTEGER NOT NULL,

    CONSTRAINT "Field_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Field" ADD CONSTRAINT "Field_activity_id_fkey" FOREIGN KEY ("activity_id") REFERENCES "Activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity_reservation" ADD CONSTRAINT "Activity_reservation_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity_reservation" ADD CONSTRAINT "Activity_reservation_field_id_fkey" FOREIGN KEY ("field_id") REFERENCES "Field"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
