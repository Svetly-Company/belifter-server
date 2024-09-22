-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Gym" (
    "idGym" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "CNPJ" TEXT NOT NULL,
    "profilePicture" TEXT NOT NULL DEFAULT '',
    "name" TEXT NOT NULL,
    "locationIdLocation" INTEGER NOT NULL,
    "accountId" INTEGER NOT NULL,
    CONSTRAINT "Gym_locationIdLocation_fkey" FOREIGN KEY ("locationIdLocation") REFERENCES "Location" ("idLocation") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Gym_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account" ("idAccount") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Gym" ("CNPJ", "accountId", "idGym", "locationIdLocation", "name") SELECT "CNPJ", "accountId", "idGym", "locationIdLocation", "name" FROM "Gym";
DROP TABLE "Gym";
ALTER TABLE "new_Gym" RENAME TO "Gym";
CREATE UNIQUE INDEX "Gym_CNPJ_key" ON "Gym"("CNPJ");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
