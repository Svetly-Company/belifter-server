/*
  Warnings:

  - You are about to drop the column `province` on the `Location` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Location" (
    "idLocation" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "CEP" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "city" TEXT NOT NULL
);
INSERT INTO "new_Location" ("CEP", "city", "district", "idLocation", "street") SELECT "CEP", "city", "district", "idLocation", "street" FROM "Location";
DROP TABLE "Location";
ALTER TABLE "new_Location" RENAME TO "Location";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
