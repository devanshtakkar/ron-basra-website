import {
  Container,
  IconButton,
  Box,
  Stack,
  ListItem,
  List,
  ListItemText,
  Typography,
  Grid2,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <Box sx={{ backgroundColor: "#f2f2ee" }} pt={10} pb={10}>
      <Container
        sx={{
          display: {
            md: "none",
            backgroundColor: "#f2f2ee",
          },
        }}
      >
        <img
          src="/images/Ron Basra Logo Gold.png"
          width={200}
          style={{ marginTop: "2rem", marginBottom: "2rem" }}
        ></img>
      </Container>
      <Box
        sx={{
          display: {
            md: "none",
            backgroundColor: "#f2f2ee",
          },
        }}
      >
        <Accordion
          disableGutters
          sx={{ backgroundColor: "#f2f2ee" }}
          elevation={0}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            Properties
          </AccordionSummary>
          <AccordionDetails>
            <List>
              <ListItem disablePadding>
                <Link href={""} className={styles.link}>
                  My Listings
                </Link>
              </ListItem>
              <ListItem disablePadding>
                <Link href={""} className={styles.link}>
                  Office Listings
                </Link>
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>
        <Accordion
          disableGutters
          sx={{ backgroundColor: "#f2f2ee" }}
          elevation={0}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            Buying
          </AccordionSummary>
          <AccordionDetails>
            <List>
              <ListItem disablePadding>
                <Link href={"/"} className={styles.link}>
                  Buying Info
                </Link>
              </ListItem>
              <ListItem disablePadding>
                <Link href={"/"} className={styles.link}>
                  Mortgage Calculator
                </Link>
              </ListItem>
              <ListItem disablePadding>
                <Link href={"/"} className={styles.link}>
                  Reports
                </Link>
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>
        <Accordion
          disableGutters
          sx={{ backgroundColor: "#f2f2ee" }}
          elevation={0}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            Selling
          </AccordionSummary>
          <AccordionDetails>
            <List>
              <ListItem disablePadding>
                <Link href={"/"} className={styles.link}>
                  Selling Info
                </Link>
              </ListItem>
              <ListItem disablePadding>
                <Link href={"/"} className={styles.link}>
                  Reports
                </Link>
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>

        <Accordion
          disableGutters
          sx={{ backgroundColor: "#f2f2ee" }}
          elevation={0}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            Support
          </AccordionSummary>
          <AccordionDetails>
            <List>
              <ListItem disablePadding>
                <Link href={""} className={styles.link}>
                  Contact
                </Link>
              </ListItem>
              <ListItem disablePadding>
                <Link href={""} className={styles.link}>
                  Blog
                </Link>
              </ListItem>
              <ListItem disablePadding>
                <Link href={""} className={styles.link}>
                  Testimonials
                </Link>
              </ListItem>
              <ListItem disablePadding>
                <Link href={""} className={styles.link}>
                  Market Report
                </Link>
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>
      </Box>

      <Container
        sx={{
          display: {
            md: "none",
            backgroundColor: "#f2f2ee",
          },
        }}
      >
        <Stack direction={"row"} justifyContent={"space-between"} marginY={2}>
          <IconButton>
            <FacebookIcon
              sx={{
                fontSize: "2rem",
                color: "black",
              }}
            />
          </IconButton>
          <IconButton
            href=""
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramIcon
              sx={{
                fontSize: "2rem",
                color: "black",
              }}
            />
          </IconButton>
          <IconButton>
            <EmailIcon
              sx={{
                fontSize: "2rem",
                color: "black",
              }}
            />
          </IconButton>
          <IconButton>
            <YouTubeIcon
              sx={{
                fontSize: "2rem",
                color: "black",
              }}
            />
          </IconButton>
        </Stack>
        <Box sx={{ minHeight: "2rem" }}></Box>
        <Typography variant="body1">(604) 617-9511</Typography>
        <Typography variant="body1">ronbasra@gmail.com</Typography>
        <Typography
          variant="body1"
          sx={{ textAlign: "center", marginTop: "3rem" }}
        >
          Copyright 2025 Ron Basra
        </Typography>
      </Container>
      <Container className={styles.desktop_footer}>
        <Grid2 container spacing={2}>
          <Grid2 size={3}>
            <Typography variant="body1" mb={2}>
              Ron Basra
            </Typography>
            <Typography variant="body1">4806 Main St.</Typography>
            <Typography variant="body1">Vancouver, BC V5V 2R8</Typography>

            <Stack direction={"row"} marginY={2}>
              <IconButton>
                <FacebookIcon
                  sx={{
                    color: "black",
                  }}
                />
              </IconButton>
              <IconButton
                href=""
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramIcon
                  sx={{
                    color: "black",
                  }}
                />
              </IconButton>
              <IconButton>
                <EmailIcon
                  sx={{
                    color: "black",
                  }}
                />
              </IconButton>
              <IconButton>
                <YouTubeIcon
                  sx={{
                    color: "black",
                  }}
                />
              </IconButton>
            </Stack>
            <Typography variant="body1">(604) 630-9899</Typography>
            <Typography variant="body1">ronbasra@gmail.com</Typography>
            <Typography variant="body1" mt={3}>
              &copy; 2025 Ron Basra
            </Typography>
          </Grid2>
          <Grid2 size={3}>
            <Typography variant="body1">Properties</Typography>
            <List>
              <ListItem disablePadding>
                <Link
                  href={"/residential-portfolio/"}
                  className={styles.link_desktop}
                >
                  My Listings
                </Link>
              </ListItem>
              <ListItem disablePadding>
                <Link
                  href={""}
                  className={styles.link_desktop}
                >
                  Office Listings
                </Link>
              </ListItem>
            </List>
          </Grid2>
          <Grid2 size={3}>
            <Typography variant="body1">Buying</Typography>
            <List>
              <ListItem disablePadding>
                <Link href={""} className={styles.link_desktop}>
                  Buying Info
                </Link>
              </ListItem>
              <ListItem disablePadding>
                <Link href={""} className={styles.link_desktop}>
                  Mortgage Calculator
                </Link>
              </ListItem>
              <ListItem disablePadding>
                <Link href={""} className={styles.link_desktop}>
                  Reports
                </Link>
              </ListItem>
            </List>
          </Grid2>
          <Grid2 size={3}>
            <Typography variant="body1">Support</Typography>
            <List>
              <ListItem disablePadding>
                <Link href={""} className={styles.link_desktop}>
                  Contact
                </Link>
              </ListItem>
              <ListItem disablePadding>
                <Link href={""} className={styles.link_desktop}>
                  Blog
                </Link>
              </ListItem>
              <ListItem disablePadding>
                <Link href={""} className={styles.link_desktop}>
                  Testimonials
                </Link>
              </ListItem>
              <ListItem disablePadding>
                <Link href={""} className={styles.link_desktop}>
                  Market Report
                </Link>
              </ListItem>
            </List>
            <img
              src="/images/Ron Basra Logo Gold.png"
              width={200}
              style={{ marginTop: "2rem" }}
            ></img>
          </Grid2>
        </Grid2>
      </Container>
    </Box>
  );
}
