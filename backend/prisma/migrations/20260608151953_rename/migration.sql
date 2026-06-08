/*
  Warnings:

  - You are about to drop the `Seat_Class` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Seat" DROP CONSTRAINT "Seat_seat_class_id_fkey";

-- DropTable
DROP TABLE "Seat_Class";

-- CreateTable
CREATE TABLE "SeatClass" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "SeatClass_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Seat" ADD CONSTRAINT "Seat_seat_class_id_fkey" FOREIGN KEY ("seat_class_id") REFERENCES "SeatClass"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
