/*
  Warnings:

  - Added the required column `accountIdAccount` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Post" (
    "idPost" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "mediaUrl" TEXT NOT NULL,
    "accountIdAccount" INTEGER NOT NULL,
    CONSTRAINT "Post_accountIdAccount_fkey" FOREIGN KEY ("accountIdAccount") REFERENCES "Account" ("idAccount") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Post" ("content", "idPost", "mediaUrl") SELECT "content", "idPost", "mediaUrl" FROM "Post";
DROP TABLE "Post";
ALTER TABLE "new_Post" RENAME TO "Post";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
