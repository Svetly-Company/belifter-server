/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `userIdUser` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `userIdUser` on the `Like` table. All the data in the column will be lost.
  - You are about to drop the column `userIdUser` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `userIdUser` on the `Gym` table. All the data in the column will be lost.
  - You are about to drop the column `receiverIdUser` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `senderIdUser` on the `Message` table. All the data in the column will be lost.
  - Added the required column `idAccount` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idAccount` to the `Like` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userIdUser` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accountId` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accountId` to the `Gym` table without a default value. This is not possible if the table is not empty.
  - Added the required column `receiverIdAccount` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senderIdAccount` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Account" (
    "idAccount" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "profilePicture" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Comment" (
    "idComment" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "idAccount" INTEGER NOT NULL,
    "postIdPost" INTEGER NOT NULL,
    CONSTRAINT "Comment_idAccount_fkey" FOREIGN KEY ("idAccount") REFERENCES "Account" ("idAccount") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Comment_postIdPost_fkey" FOREIGN KEY ("postIdPost") REFERENCES "Post" ("idPost") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Comment" ("content", "idComment", "postIdPost") SELECT "content", "idComment", "postIdPost" FROM "Comment";
DROP TABLE "Comment";
ALTER TABLE "new_Comment" RENAME TO "Comment";
CREATE TABLE "new_Like" (
    "idLike" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idAccount" INTEGER NOT NULL,
    "postIdPost" INTEGER NOT NULL,
    CONSTRAINT "Like_idAccount_fkey" FOREIGN KEY ("idAccount") REFERENCES "Account" ("idAccount") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Like_postIdPost_fkey" FOREIGN KEY ("postIdPost") REFERENCES "Post" ("idPost") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Like" ("idLike", "postIdPost") SELECT "idLike", "postIdPost" FROM "Like";
DROP TABLE "Like";
ALTER TABLE "new_Like" RENAME TO "Like";
CREATE TABLE "new_Client" (
    "idClient" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "birthdate" DATETIME NOT NULL,
    "height" DECIMAL NOT NULL,
    "weight" DECIMAL NOT NULL,
    "userIdUser" INTEGER NOT NULL
);
INSERT INTO "new_Client" ("birthdate", "height", "idClient", "weight") SELECT "birthdate", "height", "idClient", "weight" FROM "Client";
DROP TABLE "Client";
ALTER TABLE "new_Client" RENAME TO "Client";
CREATE TABLE "new_Employee" (
    "idEmployee" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "employeeTypeIdEmployeeType" INTEGER NOT NULL,
    "accountId" INTEGER NOT NULL,
    CONSTRAINT "Employee_employeeTypeIdEmployeeType_fkey" FOREIGN KEY ("employeeTypeIdEmployeeType") REFERENCES "EmployeeType" ("idEmployeeType") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Employee_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account" ("idAccount") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Employee" ("employeeTypeIdEmployeeType", "idEmployee") SELECT "employeeTypeIdEmployeeType", "idEmployee" FROM "Employee";
DROP TABLE "Employee";
ALTER TABLE "new_Employee" RENAME TO "Employee";
CREATE TABLE "new_Gym" (
    "idGym" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "CNPJ" TEXT NOT NULL,
    "locationIdLocation" INTEGER NOT NULL,
    "accountId" INTEGER NOT NULL,
    CONSTRAINT "Gym_locationIdLocation_fkey" FOREIGN KEY ("locationIdLocation") REFERENCES "Location" ("idLocation") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Gym_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account" ("idAccount") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Gym" ("CNPJ", "idGym", "locationIdLocation", "name") SELECT "CNPJ", "idGym", "locationIdLocation", "name" FROM "Gym";
DROP TABLE "Gym";
ALTER TABLE "new_Gym" RENAME TO "Gym";
CREATE TABLE "new_Message" (
    "idMessage" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL,
    "senderIdAccount" INTEGER NOT NULL,
    "receiverIdAccount" INTEGER NOT NULL,
    CONSTRAINT "Message_senderIdAccount_fkey" FOREIGN KEY ("senderIdAccount") REFERENCES "Account" ("idAccount") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Message_receiverIdAccount_fkey" FOREIGN KEY ("receiverIdAccount") REFERENCES "Account" ("idAccount") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Message" ("content", "createdAt", "idMessage") SELECT "content", "createdAt", "idMessage" FROM "Message";
DROP TABLE "Message";
ALTER TABLE "new_Message" RENAME TO "Message";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
