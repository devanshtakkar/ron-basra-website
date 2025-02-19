"use client";

import {
  Container,
  Typography,
  Box,
  Grid,
  Breadcrumbs,
  Chip,
  Stack,
  Alert,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import BedIcon from "@mui/icons-material/Bed";
import BathtubIcon from "@mui/icons-material/Bathtub";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Listing } from "../types/Listing";

interface ListingDisplayProps {
  listing: Listing;
}

export default function ListingDisplay({ listing }: ListingDisplayProps) {
  // Split title into address and title parts
  const [address, title] = listing.title.split(":");

  
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box height={80} />
      
      <Breadcrumbs sx={{ mb: 3 }}>
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
        <Typography color="text.primary">{address}</Typography>
      </Breadcrumbs>

      <Grid container spacing={4}>
        {/* Left Column */}
        <Grid xs={12} md={8}>
          {/* Main Image */}
          <Box
            sx={{
              position: "relative",
              width: "100%",
              aspectRatio: "16/9",
              borderRadius: "10px",
              overflow: "hidden",
              mb: 3,
            }}
          >
            <Image
              src={listing.photos[0]?.downloadUrl || "/images/placeholder.jpg"}
              alt={listing.title}
              fill
              style={{ objectFit: "cover" }}
            />
          </Box>

          {/* Image Gallery Grid */}
          <Grid container spacing={2} sx={{ mb: 4 }}>
            {listing.photos.slice(1, 5).map((photo, index) => (
              <Grid xs={6} sm={3} key={photo.id}>
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "1",
                    borderRadius: "5px",
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src={photo.downloadUrl}
                    alt={`Property image ${index + 2}`}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>

          {/* Property Description */}
          <Typography variant="h5" gutterBottom>
            Description
          </Typography>
          <Typography paragraph>{listing.description}</Typography>

          {/* Property Details */}
          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            Property Details
          </Typography>
          <Grid container spacing={3}>
            {Object.entries(listing.generalInfo || {}).map(([key, value]) => (
              <Grid xs={12} sm={6} key={key}>
                <Box sx={{ mb: 2 }}>
                  <Typography color="text.secondary" variant="body2">
                    {key}
                  </Typography>
                  <Typography>{value}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Right Column */}
        <Grid xs={12} md={4}>
          <Box sx={{ position: "sticky", top: 100 }}>
            {/* Status and Property Type */}
            <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
              <Chip label={listing.mainSummary.status} color="primary" />
              <Chip label={listing.mainSummary.propertyType} />
            </Stack>

            {/* Price */}
            <Typography variant="h4" sx={{ mb: 2 }}>
              ${listing.price?.toLocaleString()}
            </Typography>

            {/* Basic Info */}
            <Stack spacing={2} sx={{ mb: 3 }}>
              <Stack direction="row" spacing={1} alignItems="center">
                <LocationOnIcon color="action" />
                <Typography>{address}</Typography>
              </Stack>
              <Stack direction="row" spacing={3}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <BedIcon color="action" />
                  <Typography>{listing.mainSummary.bedrooms} Beds</Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <BathtubIcon color="action" />
                  <Typography>{listing.mainSummary.bathrooms} Baths</Typography>
                </Stack>
              </Stack>
            </Stack>

            {/* MLS Info */}
            <Typography color="text.secondary" sx={{ mb: 3 }}>
              MLS® {listing.mainSummary.MLS}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
} 