-- CreateTable
CREATE TABLE "User" (
    "idUser" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "profilePicture" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "EmployeeType" (
    "idEmployeeType" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Employee" (
    "idEmployee" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "employeeTypeIdEmployeeType" INTEGER NOT NULL,
    "userIdUser" INTEGER NOT NULL,
    CONSTRAINT "Employee_employeeTypeIdEmployeeType_fkey" FOREIGN KEY ("employeeTypeIdEmployeeType") REFERENCES "EmployeeType" ("idEmployeeType") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Employee_userIdUser_fkey" FOREIGN KEY ("userIdUser") REFERENCES "User" ("idUser") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Client" (
    "idClient" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "birthdate" DATETIME NOT NULL,
    "height" DECIMAL NOT NULL,
    "weight" DECIMAL NOT NULL
);

-- CreateTable
CREATE TABLE "Plan" (
    "idPlan" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DECIMAL NOT NULL
);

-- CreateTable
CREATE TABLE "Location" (
    "idLocation" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "CEP" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "province" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Gym" (
    "idGym" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "CNPJ" TEXT NOT NULL,
    "locationIdLocation" INTEGER NOT NULL,
    "userIdUser" INTEGER NOT NULL,
    CONSTRAINT "Gym_locationIdLocation_fkey" FOREIGN KEY ("locationIdLocation") REFERENCES "Location" ("idLocation") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Gym_userIdUser_fkey" FOREIGN KEY ("userIdUser") REFERENCES "User" ("idUser") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "GymEmployee" (
    "idGymEmployees" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "gymIdGym" INTEGER NOT NULL,
    "employeeIdEmployee" INTEGER NOT NULL,
    CONSTRAINT "GymEmployee_gymIdGym_fkey" FOREIGN KEY ("gymIdGym") REFERENCES "Gym" ("idGym") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "GymEmployee_employeeIdEmployee_fkey" FOREIGN KEY ("employeeIdEmployee") REFERENCES "Employee" ("idEmployee") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Message" (
    "idMessage" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL,
    "senderIdUser" INTEGER NOT NULL,
    "receiverIdUser" INTEGER NOT NULL,
    CONSTRAINT "Message_senderIdUser_fkey" FOREIGN KEY ("senderIdUser") REFERENCES "User" ("idUser") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Message_receiverIdUser_fkey" FOREIGN KEY ("receiverIdUser") REFERENCES "User" ("idUser") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Post" (
    "idPost" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "mediaUrl" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Like" (
    "idLike" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userIdUser" INTEGER NOT NULL,
    "postIdPost" INTEGER NOT NULL,
    CONSTRAINT "Like_userIdUser_fkey" FOREIGN KEY ("userIdUser") REFERENCES "User" ("idUser") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Like_postIdPost_fkey" FOREIGN KEY ("postIdPost") REFERENCES "Post" ("idPost") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Comment" (
    "idComment" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "userIdUser" INTEGER NOT NULL,
    "postIdPost" INTEGER NOT NULL,
    CONSTRAINT "Comment_userIdUser_fkey" FOREIGN KEY ("userIdUser") REFERENCES "User" ("idUser") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Comment_postIdPost_fkey" FOREIGN KEY ("postIdPost") REFERENCES "Post" ("idPost") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "WorkoutSchedule" (
    "idWorkoutSchedule" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL,
    "employeeIdEmployee" INTEGER NOT NULL,
    "clientIdClient" INTEGER NOT NULL,
    CONSTRAINT "WorkoutSchedule_employeeIdEmployee_fkey" FOREIGN KEY ("employeeIdEmployee") REFERENCES "Employee" ("idEmployee") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "WorkoutSchedule_clientIdClient_fkey" FOREIGN KEY ("clientIdClient") REFERENCES "Client" ("idClient") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Exercise" (
    "idExercise" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "IndividualExercise" (
    "idIndividualExercise" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "repetitions" INTEGER NOT NULL,
    "exerciseIdExercise" INTEGER NOT NULL,
    "workoutDayIdWorkoutDay" INTEGER NOT NULL,
    CONSTRAINT "IndividualExercise_exerciseIdExercise_fkey" FOREIGN KEY ("exerciseIdExercise") REFERENCES "Exercise" ("idExercise") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "IndividualExercise_workoutDayIdWorkoutDay_fkey" FOREIGN KEY ("workoutDayIdWorkoutDay") REFERENCES "WorkoutDay" ("idWorkoutDay") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "WorkoutDay" (
    "idWorkoutDay" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "workoutScheduleIdWorkoutSchedule" INTEGER NOT NULL,
    CONSTRAINT "WorkoutDay_workoutScheduleIdWorkoutSchedule_fkey" FOREIGN KEY ("workoutScheduleIdWorkoutSchedule") REFERENCES "WorkoutSchedule" ("idWorkoutSchedule") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Food" (
    "idFood" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "calories" INTEGER NOT NULL,
    "carbo" INTEGER NOT NULL,
    "protein" INTEGER NOT NULL,
    "transFat" INTEGER NOT NULL,
    "saturatedFat" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "ConsumedFood" (
    "idConsumedFood" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clientIdClient" INTEGER NOT NULL,
    "foodIdFood" INTEGER NOT NULL,
    CONSTRAINT "ConsumedFood_clientIdClient_fkey" FOREIGN KEY ("clientIdClient") REFERENCES "Client" ("idClient") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ConsumedFood_foodIdFood_fkey" FOREIGN KEY ("foodIdFood") REFERENCES "Food" ("idFood") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DietFood" (
    "idDietFood" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dietIdDiet" INTEGER NOT NULL,
    "foodIdFood" INTEGER NOT NULL,
    CONSTRAINT "DietFood_dietIdDiet_fkey" FOREIGN KEY ("dietIdDiet") REFERENCES "Diet" ("idDiet") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DietFood_foodIdFood_fkey" FOREIGN KEY ("foodIdFood") REFERENCES "Food" ("idFood") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Diet" (
    "idDiet" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL,
    "employeeIdEmployee" INTEGER NOT NULL,
    "clientIdClient" INTEGER NOT NULL,
    CONSTRAINT "Diet_employeeIdEmployee_fkey" FOREIGN KEY ("employeeIdEmployee") REFERENCES "Employee" ("idEmployee") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Diet_clientIdClient_fkey" FOREIGN KEY ("clientIdClient") REFERENCES "Client" ("idClient") ON DELETE RESTRICT ON UPDATE CASCADE
);
