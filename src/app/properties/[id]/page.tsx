import { Container, Alert } from "@mui/material";
import { PrismaClient } from "@prisma/client";
import ListingDisplay from "./ListingDisplay";
import { Listing } from "../my-listings/types/Listing";

const prisma = new PrismaClient();

async function getListing(id: string) {
  try {
    const response = await prisma.listing.findUnique({
      where: {
        id: id,
      },
      include: {
        photos: true,
        rooms: true,
        bathrooms: true,
        url: true,
      },
    });

    if (!response) {
      throw new Error("Listing not found");
    }

    // Parse all JSON fields and cast to Listing type
    const parsedListing = {
      ...response,
      mainSummary:
        typeof response.mainSummary === "string"
          ? JSON.parse(response.mainSummary)
          : response.mainSummary,
      generalInfo:
        typeof response.generalInfo === "string"
          ? JSON.parse(response.generalInfo)
          : response.generalInfo,
      coordinates:
        typeof response.coordinates === "string"
          ? JSON.parse(response.coordinates)
          : response.coordinates,
      listingDetails:
        typeof response.listingDetails === "string"
          ? JSON.parse(response.listingDetails)
          : response.listingDetails,
      wideInfo:
        typeof response.wideInfo === "string"
          ? JSON.parse(response.wideInfo)
          : response.wideInfo,
      photos: Array.isArray(response.photos) ? response.photos : [],
    } as unknown as Listing;

    return { listing: parsedListing, error: null };
  } catch (error) {
    console.error("Error fetching listing:", error);
    return {
      listing: null,
      error:
        error instanceof Error
          ? error.message
          : "An error occurred while fetching the listing",
    };
  }
}

export default async function PropertyListing({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { listing, error } = await getListing(id);

  if (error) {
    return (
      <Container maxWidth="xl" sx={{ mb: 10 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!listing) {
    return (
      <Container maxWidth="xl" sx={{ mb: 10 }}>
        <Alert severity="error">Listing not found</Alert>
      </Container>
    );
  }

  return <ListingDisplay listing={listing} />;
}
