"use client";
import { Container, IconButton, Grid2, useMediaQuery, Box } from "@mui/material";
import styles from "./Hero.module.css";
import MobileSelect from "./MobileSelect";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function Hero() {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <>
      <div style={{ backgroundColor: "gray", minHeight: "100vh" }}>
        {isMobile && (
          <>
            <video
              autoPlay
              muted
              loop
              playsInline
              style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: 0,
            }}
          >
              <source src="/videos/header-mobile.mp4" type="video/mp4" />
            </video>
          </>
        )}

        <Container maxWidth="xl" sx={{ position: "absolute", zIndex: 2, height: "100%", background: {
          xs: "rgba(0, 0, 0, 0.4)",
          md: "rgba(0, 0, 0, 0.0)",
        } }}>
          <Grid2 container>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <h1 className={styles.hero_heading}>
                Find Your Dream Home in Vancouver.{" "}
              </h1>
              <p
                className="mono_font"
                style={{ color: "white", fontWeight: 500 }}
              >
                VIEW OUR LISTINGS
              </p>
              {isMobile ? (
                <MobileSelect
                  navigateToProjects={() => {}}
                  location={"Vancouver, BC"}
                  propertyType={"Single Family"}
                  setPropertyType={() => {}}
                  setLocation={() => {}}
                />
              ) : (
                <div
                  style={{
                    marginBottom: "2rem",
                    display: "flex",
                  }}
                >
                  <button
                    className={styles.hero_selector_btn_left}
                    onClick={() => {}}
                  >
                    Single Family
                    <div className={styles.selector_btn_div}>
                      <span className={styles.selector_btn_span}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 48 48"
                          className={styles.selector_btn_svg}
                        >
                          <g data-icon="icon--arrow-down">
                            <path
                              d="M24.312,37.431 L1.24,14.359 L5.031,10.569 L24.312,29.851 L43.594,10.569 L47.385,14.359 L24.312,37.431 z"
                              id="arrow-down"
                            ></path>
                          </g>
                        </svg>
                      </span>
                    </div>
                  </button>
                  <button
                    className={styles.hero_selector_btn_right}
                    onClick={() => {}}
                  >
                    Vancouver, BC
                    <div className={styles.selector_btn_div}>
                      <span className={styles.selector_btn_span}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 48 48"
                          className={styles.selector_btn_svg}
                        >
                          <g data-icon="icon--arrow-down">
                            <path
                              d="M24.312,37.431 L1.24,14.359 L5.031,10.569 L24.312,29.851 L43.594,10.569 L47.385,14.359 L24.312,37.431 z"
                              id="arrow-down"
                            ></path>
                          </g>
                        </svg>
                      </span>
                    </div>
                  </button>
                  <IconButton
                    onClick={() => {}}
                    sx={{
                      backgroundColor: "primary.main", // Button background color
                      color: "white", // Icon color
                      "&:hover": {
                        backgroundColor: "primary.dark", // Hover background
                      },
                      padding: "12px", // Adjust padding for better click area
                      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)", // Optional: Add shadow
                      marginLeft: "1rem",
                    }}
                  >
                    <ArrowForwardIcon />
                  </IconButton>
                </div>
              )}
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}></Grid2>
          </Grid2>
        </Container>
      </div>
    </>
  );
}
