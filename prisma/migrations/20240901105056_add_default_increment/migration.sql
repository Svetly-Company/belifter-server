/*
  Warnings:

  - Added the required column `type` to the `Food` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Food" (
    "idFood" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "type" INTEGER NOT NULL,
    "calories" INTEGER NOT NULL,
    "carbo" INTEGER NOT NULL,
    "protein" INTEGER NOT NULL,
    "transFat" INTEGER NOT NULL,
    "saturatedFat" INTEGER NOT NULL
);
INSERT INTO "new_Food" ("calories", "carbo", "description", "idFood", "image", "name", "protein", "saturatedFat", "transFat") SELECT "calories", "carbo", "description", "idFood", "image", "name", "protein", "saturatedFat", "transFat" FROM "Food";
DROP TABLE "Food";
ALTER TABLE "new_Food" RENAME TO "Food";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
