/*
  Warnings:

  - You are about to drop the column `userId` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `PriceRecord` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Shop` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Category" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "categoryName" TEXT NOT NULL,
    "deletedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Category" ("categoryName", "createdAt", "deletedAt", "id", "updatedAt") SELECT "categoryName", "createdAt", "deletedAt", "id", "updatedAt" FROM "Category";
DROP TABLE "Category";
ALTER TABLE "new_Category" RENAME TO "Category";
CREATE TABLE "new_PriceRecord" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "itemName" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "unit" TEXT,
    "memo" TEXT,
    "categoryId" TEXT,
    "shopId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_PriceRecord" ("categoryId", "createdAt", "id", "itemName", "memo", "price", "shopId", "unit", "updatedAt") SELECT "categoryId", "createdAt", "id", "itemName", "memo", "price", "shopId", "unit", "updatedAt" FROM "PriceRecord";
DROP TABLE "PriceRecord";
ALTER TABLE "new_PriceRecord" RENAME TO "PriceRecord";
CREATE TABLE "new_Shop" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "shopName" TEXT NOT NULL,
    "deletedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Shop" ("createdAt", "deletedAt", "id", "shopName", "updatedAt") SELECT "createdAt", "deletedAt", "id", "shopName", "updatedAt" FROM "Shop";
DROP TABLE "Shop";
ALTER TABLE "new_Shop" RENAME TO "Shop";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
