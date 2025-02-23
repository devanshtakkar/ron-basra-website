-- CreateTable
CREATE TABLE "ListingUrl" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "category" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Room" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "level" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "width" TEXT NOT NULL,
    "length" TEXT NOT NULL,
    "listingId" TEXT NOT NULL,
    CONSTRAINT "Room_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Bathroom" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "level" TEXT NOT NULL,
    "ensuite" BOOLEAN NOT NULL,
    "pieces" INTEGER NOT NULL,
    "listingId" TEXT NOT NULL,
    CONSTRAINT "Bathroom_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Listing" (
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
    "category" TEXT NOT NULL,
    "openHouse" BOOLEAN NOT NULL DEFAULT false,
    "openHouseDate" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Listing_urlId_fkey" FOREIGN KEY ("urlId") REFERENCES "ListingUrl" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Images" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "downloadUrl" TEXT NOT NULL,
    "savedPath" TEXT NOT NULL,
    "listingId" TEXT NOT NULL,
    CONSTRAINT "Images_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "ListingUrl_url_key" ON "ListingUrl"("url");

-- CreateIndex
CREATE UNIQUE INDEX "ListingUrl_url_category_key" ON "ListingUrl"("url", "category");

-- CreateIndex
CREATE UNIQUE INDEX "Listing_urlId_key" ON "Listing"("urlId");

-- CreateIndex
CREATE UNIQUE INDEX "Images_listingId_downloadUrl_key" ON "Images"("listingId", "downloadUrl");
