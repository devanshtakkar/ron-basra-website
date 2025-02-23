/*
  Warnings:

  - You are about to drop the column `category` on the `Listing` table. All the data in the column will be lost.
  - Added the required column `price` to the `ListingUrl` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Images_listingId_downloadUrl_key";

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Listing" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "mainSummary" JSONB NOT NULL,
    "generalInfo" JSONB,
    "coordinates" JSONB NOT NULL,
    "listingDetails" JSONB,
    "wideInfo" JSONB,
    "urlId" TEXT,
    "price" INTEGER,
    "sold" BOOLEAN NOT NULL DEFAULT false,
    "openHouse" BOOLEAN NOT NULL DEFAULT false,
    "openHouseDate" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "old" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Listing_urlId_fkey" FOREIGN KEY ("urlId") REFERENCES "ListingUrl" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Listing" ("coordinates", "createdAt", "description", "generalInfo", "id", "listingDetails", "mainSummary", "openHouse", "openHouseDate", "price", "sold", "title", "urlId", "wideInfo") SELECT "coordinates", "createdAt", "description", "generalInfo", "id", "listingDetails", "mainSummary", "openHouse", "openHouseDate", "price", "sold", "title", "urlId", "wideInfo" FROM "Listing";
DROP TABLE "Listing";
ALTER TABLE "new_Listing" RENAME TO "Listing";
CREATE UNIQUE INDEX "Listing_urlId_key" ON "Listing"("urlId");
CREATE TABLE "new_ListingUrl" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "category" TEXT NOT NULL,
    "price" INTEGER NOT NULL
);
INSERT INTO "new_ListingUrl" ("category", "createdAt", "id", "url") SELECT "category", "createdAt", "id", "url" FROM "ListingUrl";
DROP TABLE "ListingUrl";
ALTER TABLE "new_ListingUrl" RENAME TO "ListingUrl";
CREATE UNIQUE INDEX "ListingUrl_url_category_key" ON "ListingUrl"("url", "category");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
