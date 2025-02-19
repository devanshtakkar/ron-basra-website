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
import "@/app/css/curved_button.css";
import BedIcon from '@mui/icons-material/Bed';
import BathtubIcon from '@mui/icons-material/Bathtub';
import HomeIcon from '@mui/icons-material/Home';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SellIcon from '@mui/icons-material/Sell';
import TagIcon from '@mui/icons-material/Tag';
import { useState } from "react";
import { useMediaQuery } from "@mui/material";

interface ListingDisplayProps {
  listing: Listing;
}

export default function ListingDisplay({ listing }: ListingDisplayProps) {
  // Split title into address and title parts
  const [address, title] = listing.title.split(":");
  const [showFullDescription, setShowFullDescription] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');

  const truncatedDescription = isMobile && !showFullDescription
    ? `${listing.description.slice(0, 150)}...`
    : listing.description;

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

      <div className="listing-grid">
        <div className="listing-grid-item left-content">
          <Typography variant="h3" component="h1" sx={{ mb: 2 }}>
            {title}
          </Typography>
          
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid size={{xs: 6}}>
              <Typography variant="subtitle1" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <TagIcon /> MLS Number
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {listing.mainSummary.MLS}
              </Typography>
            </Grid>
            <Grid size={{xs: 6}}>
              <Typography variant="subtitle1" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <HomeIcon /> Property Type
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {listing.mainSummary.propertyType}
              </Typography>
            </Grid>
            <Grid size={{xs: 6}}>
              <Typography variant="subtitle1" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <BedIcon /> Bedrooms
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {listing.mainSummary.bedrooms}
              </Typography>
            </Grid>
            <Grid size={{xs: 6}}>
              <Typography variant="subtitle1" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <BathtubIcon /> Bathrooms
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {listing.mainSummary.bathrooms}
              </Typography>
            </Grid>
          </Grid>

          <Typography variant="body1" sx={{ mb: 4 }}>
            {truncatedDescription}
            {isMobile && listing.description.length > 150 && (
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#1976d2',
                  padding: 0,
                  font: 'inherit',
                  cursor: 'pointer',
                  marginLeft: '4px',
                }}
              >
                {showFullDescription ? 'Read less' : 'Read more...'}
              </button>
            )}
          </Typography>

          <button className="btn_white">
            Contact Now
          </button>
        </div>
        <div className="listing-grid-item right-content">
          {listing.photos && listing.photos.length > 0 && (
            <div className="featured-image">
              <img 
                src={listing.photos[1].downloadUrl} 
                alt={`Featured image of ${address}`}
              />
            </div>
          )}
          
          <div className="property-details">
            <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
              {address}
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{xs: 6}}>
                <Typography variant="subtitle2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CalendarTodayIcon fontSize="small" /> Year Built
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  {listing.mainSummary.yearBuilt}
                </Typography>
              </Grid>
              <Grid size={{xs: 6}}>
                <Typography variant="subtitle2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <SellIcon fontSize="small" /> Status
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  {listing.mainSummary.status}
                </Typography>
              </Grid>
              {listing.price && (
                <Grid size={{xs: 12}}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Price
                  </Typography>
                  <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
                    ${listing.price.toLocaleString()}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </div>
        </div>
      </div>
      <style jsx>{`
        .listing-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          margin-top: 32px;
        }

        .listing-grid-item {
          padding: 24px;
          border-radius: 12px;
          background: #fff;
          // box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .featured-image {
          width: 100%;
          height: 300px;
          border-radius: 8px;
          overflow: hidden;
          margin-bottom: 24px;
        }

        .featured-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .property-details {
          padding-top: 24px;
        }

        .contact-button {
          background: #1976d2;
          color: white;
          border: none;
          padding: 12px 32px;
          border-radius: 6px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .contact-button:hover {
          background: #1565c0;
        }

        @media (max-width: 600px) {
          .listing-grid {
            grid-template-columns: 1fr;
          }
          .left-content {
            order: 2;
          }
          .right-content {
            order: 1;
          }
        }
      `}</style>
      <ImageGallery photos={listing.photos} />
    </Container>
  );
}
