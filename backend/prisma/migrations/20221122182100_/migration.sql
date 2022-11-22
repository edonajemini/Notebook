/*
  Warnings:

  - Added the required column `category` to the `Notes` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Notes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tittle" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "done" BOOLEAN NOT NULL,
    "category" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Notes" ("createdAt", "done", "id", "text", "tittle") SELECT "createdAt", "done", "id", "text", "tittle" FROM "Notes";
DROP TABLE "Notes";
ALTER TABLE "new_Notes" RENAME TO "Notes";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
