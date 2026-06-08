/*
  Warnings:

  - You are about to drop the column `price` on the `Seat` table. All the data in the column will be lost.
  - Added the required column `seat_class_id` to the `Seat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Seat" DROP COLUMN "price",
ADD COLUMN     "seat_class_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Seat_Class" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Seat_Class_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Seat" ADD CONSTRAINT "Seat_seat_class_id_fkey" FOREIGN KEY ("seat_class_id") REFERENCES "Seat_Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
