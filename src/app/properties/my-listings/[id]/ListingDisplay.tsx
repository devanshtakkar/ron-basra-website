"use client";

import {
  Container,
  Typography,
  Breadcrumbs,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import Link from "next/link";
import { Listing } from "../types/Listing";
import ImageGallery from "./ImageGallery";

interface ListingDisplayProps {
  listing: Listing;
}

export default function ListingDisplay({ listing }: ListingDisplayProps) {
  // Split title into address and title parts
  const [address, title] = listing.title.split(":");
  console.log(listing);

  return (
    <Container maxWidth="xl" sx={{ mb: 10 }}>
      <Breadcrumbs sx={{ mt: 4 }}>
        <Link
          href="/"
          style={{
            color: "grey",
            textDecoration: "none",
          }}
        >
          HOME
        </Link>
        <Link
          href="/properties/my-listings"
          style={{
            color: "grey",
            textDecoration: "none",
          }}
        >
          MY LISTINGS
        </Link>
        <Typography color="text.primary">{address.toUpperCase()}</Typography>
      </Breadcrumbs>

      
      <ImageGallery photos={listing.photos} />
    </Container>
  );
}
