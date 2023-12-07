/*
  Warnings:

  - You are about to drop the column `deletedAt` on the `PriceRecord` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Category" ADD COLUMN "deletedAt" DATETIME;

-- AlterTable
ALTER TABLE "Shop" ADD COLUMN "deletedAt" DATETIME;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PriceRecord" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "itemName" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "unit" TEXT,
    "memo" TEXT,
    "categoryId" TEXT,
    "shopId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_PriceRecord" ("categoryId", "createdAt", "id", "itemName", "memo", "price", "shopId", "unit", "updatedAt", "userId") SELECT "categoryId", "createdAt", "id", "itemName", "memo", "price", "shopId", "unit", "updatedAt", "userId" FROM "PriceRecord";
DROP TABLE "PriceRecord";
ALTER TABLE "new_PriceRecord" RENAME TO "PriceRecord";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
