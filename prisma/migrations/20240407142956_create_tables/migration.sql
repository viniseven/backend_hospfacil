-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "second_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "accommodations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "img_accommodation" TEXT,
    "category" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "about" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "assessments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "accommodation_id" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    CONSTRAINT "assessments_accommodation_id_fkey" FOREIGN KEY ("accommodation_id") REFERENCES "accommodations" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "assessments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "trips" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" INTEGER NOT NULL,
    "accommodation_id" TEXT NOT NULL,
    "start_date" DATETIME NOT NULL,
    "final_date" DATETIME NOT NULL,
    "price" REAL NOT NULL,
    "guests" INTEGER NOT NULL,
    CONSTRAINT "trips_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "trips_accommodation_id_fkey" FOREIGN KEY ("accommodation_id") REFERENCES "accommodations" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "accommodations_name_key" ON "accommodations"("name");
