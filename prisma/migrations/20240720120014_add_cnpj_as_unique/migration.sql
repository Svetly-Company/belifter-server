/*
  Warnings:

  - A unique constraint covering the columns `[CNPJ]` on the table `Gym` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Gym_CNPJ_key" ON "Gym"("CNPJ");
