/*
  Warnings:

  - You are about to drop the column `description` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Plan` table. All the data in the column will be lost.
  - Added the required column `clientIdClient` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gymIdGym` to the `Plan` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Plan" (
    "idPlan" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clientIdClient" INTEGER NOT NULL,
    "gymIdGym" INTEGER NOT NULL,
    CONSTRAINT "Plan_clientIdClient_fkey" FOREIGN KEY ("clientIdClient") REFERENCES "Client" ("idClient") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Plan_gymIdGym_fkey" FOREIGN KEY ("gymIdGym") REFERENCES "Gym" ("idGym") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Plan" ("idPlan") SELECT "idPlan" FROM "Plan";
DROP TABLE "Plan";
ALTER TABLE "new_Plan" RENAME TO "Plan";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
