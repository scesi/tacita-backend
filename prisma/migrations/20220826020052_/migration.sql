-- CreateTable
CREATE TABLE "subject" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "level" INTEGER NOT NULL,
    "icon" VARCHAR(255) NOT NULL,

    CONSTRAINT "subject_pkey" PRIMARY KEY ("id")
);
