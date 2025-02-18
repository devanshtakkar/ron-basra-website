"use client";
import { Container, Grid2, Box } from "@mui/material";
import FeaturedSwiper from "./FeaturedSwiper";
import Link from "next/link";
import useMediaQuery from "@mui/material/useMediaQuery";


export default function FeaturedListings() {
    const isMobile = useMediaQuery("(max-width: 600px)");
  return (
    <>
      <Box
        sx={{
          backgroundColor: "rgb(215, 210, 193)",
          paddingTop: "3rem",
        }}
      >
        <Container maxWidth="xl">
          <Grid2
            container
            spacing={isMobile ? 2 : 4}
            sx={{ marginBottom: { xs: 3, md: 0 } }}
          >
            <Grid2 size={{ xs: 12, md: 5 }}>
              <h2
                style={{
                  fontSize: isMobile ? 32 : 56,
                  fontWeight: "normal",
                  margin: 0,
                }}
              >
                Featured Listings
              </h2>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 7 }}>
              <p style={{ margin: 0 }}>
                Discover exceptional real estate opportunities in Vancouver's most desirable neighborhoods. 
                From luxury condos with stunning city views to charming single-family homes in peaceful 
                residential areas, our curated selection showcases the finest properties the Vancouver 
                market has to offer.
              </p>
            </Grid2>
          </Grid2>
          <FeaturedSwiper isMobile={isMobile} />
          <Box sx={{ height: "2rem" }}></Box>
          <Link href="" className="mono_font_link">
            SEE ALL LISTINGS
          </Link>
          <Box sx={{ height: "3rem" }}></Box>
        </Container>
      </Box>
    </>
  );
}
