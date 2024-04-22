-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_accommodations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "city" TEXT,
    "country" TEXT,
    "img_accommodation" TEXT,
    "category" TEXT,
    "price" REAL,
    "about" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_accommodations" ("about", "category", "city", "country", "created_at", "id", "img_accommodation", "name", "price", "updated_at") SELECT "about", "category", "city", "country", "created_at", "id", "img_accommodation", "name", "price", "updated_at" FROM "accommodations";
DROP TABLE "accommodations";
ALTER TABLE "new_accommodations" RENAME TO "accommodations";
CREATE UNIQUE INDEX "accommodations_name_key" ON "accommodations"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
