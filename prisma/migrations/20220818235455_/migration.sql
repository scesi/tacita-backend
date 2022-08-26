-- CreateTable
CREATE TABLE "Semester" (
    "id" SERIAL NOT NULL,
    "gestion" VARCHAR(50) NOT NULL,
    "end_date" DATE NOT NULL,
    "start_date" DATE NOT NULL,

    CONSTRAINT "Semester_pkey" PRIMARY KEY ("id")
);
