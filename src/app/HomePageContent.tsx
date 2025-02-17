import { Box, Container, Grid2, Typography } from "@mui/material";
import Image from "next/image";

export default function HomePageContent() {
  return (
    <>
      <Container maxWidth="xl">
        <Grid2 container spacing={10} marginY={10}>
          <Grid2 size={{ xs: 12, md: 5 }}>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                minHeight: "80vh",
              }}
            >
              <Image
                src="/images/ron.jpg"
                alt="Ron Basra"
                fill
                style={{
                  objectFit: "cover",
                }}
              />
            </Box>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 7 }}>
            <h2 className="heading_4r">Vancouver's Real Estate Maven</h2>
            <p>
              My journey in real estate began at age 10, touring construction
              sites and open houses with my father, a builder and realtor. By
              13, I had developed a strong understanding of zoning bylaws and
              construction, launching my real estate career at 19 with big
              dreams and determination.
            </p>

            <p>
              With over 25 years of experience, I've built my reputation on
              treating every transaction as if it were my own. I take pride in
              helping clients find their perfect home by thoroughly
              understanding their current and future needs. My marketing
              approach includes professional staging, top-quality photography,
              drone videos, and red-carpet events for new constructions.
            </p>

            <p>
              Community involvement is close to my heart, particularly
              supporting BC Children's Hospital and various local initiatives.
              I'm driven by passion, knowledge, and experience, always striving
              to exceed expectations. My greatest reward comes from building
              long-lasting relationships with clients who trust me with their
              most important investment decisions.
            </p>
            <Box sx={{ textAlign: "right", mt: 2 }}>
              <Typography variant="h6" sx={{ fontStyle: "italic" }}>
                Ron Basra
              </Typography>
            </Box>
          </Grid2>
        </Grid2>
        <Grid2 container spacing={10} marginY={10} alignItems={"center"}>
          <Grid2 size={{ xs: 12, md: 4 }}>
            <Box
              sx={{
                position: "relative",
                padding: "2rem",
                backgroundColor: "#f5f5f5",
                borderRadius: "8px",
              }}
            >
              <Typography
                variant="h1"
                sx={{
                  position: "absolute",
                  top: "-20px",
                  left: "20px",
                  fontSize: "72px",
                  color: "#D4AF37",
                }}
              >
                "
              </Typography>
              <Typography variant="h5" sx={{ mb: 2, mt: 3 }}>
                It's no surprise that I specialize in East Vancouver. I was
                born, raised and continue to live here …
              </Typography>
              <Typography
                variant="h1"
                sx={{
                  position: "absolute",
                  bottom: "-40px",
                  right: "20px",
                  fontSize: "72px",
                  color: "#D4AF37",
                }}
              >
                "
              </Typography>
            </Box>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 8 }}>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                minHeight: { xs: "300px", md: "80vh" },
              }}
            >
              <Image
                src="/images/vancouver.jpg"
                alt="Vancouver"
                fill
                style={{
                  objectFit: "cover",
                }}
              />
            </Box>

          </Grid2>
        </Grid2>
      </Container>
    </>
  );
}
