-- CreateTable
CREATE TABLE "Workout" (
    "idWorkout" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Exercise" (
    "idExercise" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "workoutIdWorkout" INTEGER,
    CONSTRAINT "Exercise_workoutIdWorkout_fkey" FOREIGN KEY ("workoutIdWorkout") REFERENCES "Workout" ("idWorkout") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Exercise" ("description", "idExercise", "image", "name") SELECT "description", "idExercise", "image", "name" FROM "Exercise";
DROP TABLE "Exercise";
ALTER TABLE "new_Exercise" RENAME TO "Exercise";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
