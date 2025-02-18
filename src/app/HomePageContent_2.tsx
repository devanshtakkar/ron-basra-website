import { Box, Container, Grid2, Typography } from "@mui/material";
import Image from "next/image";

export default function HomePageContent_2() {
  return (
    <>
      <Container maxWidth="xl">
        <Grid2 container spacing={10} marginY={10}>
          <Grid2 size={{ xs: 12, md: 7 }}>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                minHeight: "50vh",
                aspectRatio: "2/1",
              }}
            >
              <Image
                src="/images/house.jpg"
                alt="Ron Basra"
                fill
                style={{
                  objectFit: "cover",
                }}
              />
            </Box>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 5 }}>
            <h2 className="heading_4r">Boutique Projects</h2>
            <p>
              With experience managing nearly 50 homes, Ron Basra has an
              in-depth understanding of the construction process. By
              continuously gathering feedback from buyers about the homes we've
              built, I relay this information to our builders to enhance our
              projects. I am actively involved in the design process from
              inception to completion, frequently visiting construction sites to
              ensure everything is progressing smoothly. When designing a
              project, our team, including interior designers, architects, and
              other consultants, always asks, "Would I want to live here?" My
              extensive knowledge of various zoning laws and regulations allows
              me to find the perfect sites for our builders' specific needs. I
              prefer working on smaller, boutique projects with 15-20 units,
              including single-family homes, duplexes, triplexes, and
              four-plexes.
            </p>
          </Grid2>
        </Grid2>
      </Container>
    </>
  );
}
