/*
  Warnings:

  - You are about to drop the `Semester` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Semester";

-- CreateTable
CREATE TABLE "semesters" (
    "id" SERIAL NOT NULL,
    "gestion" VARCHAR(50) NOT NULL,
    "end_date" DATE NOT NULL,
    "start_date" DATE NOT NULL,

    CONSTRAINT "semesters_pkey" PRIMARY KEY ("id")
);
