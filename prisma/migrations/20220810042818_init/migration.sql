-- CreateTable
CREATE TABLE "status" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "color" VARCHAR(255) NOT NULL,

    CONSTRAINT "status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activities" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "start_date" DATE NOT NULL,
    "end_date" DATE NOT NULL,
    "status_id" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "type" VARCHAR(64) NOT NULL,
    "score" INTEGER,
    "is_template" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "activities_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "status_name_key" ON "status"("name");

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
