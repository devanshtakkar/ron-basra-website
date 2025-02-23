import { Box, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Image from "next/image";
import "@/app/css/status_chip.css";
import Link from "next/link";
import styles from "./ListingCard.module.css";
import BedIcon from "@mui/icons-material/Bed";
import BathtubIcon from "@mui/icons-material/Bathtub";
import LocationOnIcon from "@mui/icons-material/LocationOn";

interface ListingCardProps {
  image: string;
  title: string;
  status?: string;
  href: string;
  description: string;
  year_built?: string;
  lot_size?: string;
  propertyType?: string;
  mls?: string;
  bedrooms?: number;
  bathrooms?: number;
  price: number;
}

export default function ListingCard({
  image,
  title,
  status,
  href,
  description,
  propertyType,
  mls,
  bedrooms,
  bathrooms,
  price,
  lot_size,
}: ListingCardProps) {
  const truncatedDescription =
    description.length > 150
      ? description.substring(0, 150) + "..."
      : description;

  let parts = title.split(":");
  let address = parts[0];
  title = parts[1];
  return (
    <Link href={href} className={styles.remove_decoration}>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          aspectRatio: "1.5 / 1",
          borderRadius: "10px",
          overflow: "hidden",
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "75%",
            background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
            pointerEvents: "none",
            zIndex: 9,
          },
        }}
      >
        <Image
          src={image}
          alt={title}
          fill
          style={{
            objectFit: "cover",
          }}
        />
        <Stack
          direction="row"
          spacing={1}
          sx={{
            position: "absolute",
            top: "10px",
            left: "10px",
            zIndex: 20,
          }}
        >
          {status && <div className="status_chip">{status}</div>}
          {propertyType && <div className="status_chip">{propertyType}</div>}
        </Stack>

        <Box
          sx={{
            position: "absolute",
            bottom: "10px",
            left: "10px",
            zIndex: 20,
            width: "90%",
          }}
        >
          <Typography sx={{ color: "white", fontSize: "0.9rem", mb: 0.5 }}>
            MLS® {mls}
          </Typography>
          <Typography
            sx={{
              color: "white",
              fontSize: "1.2rem",
              fontWeight: "400",
              mb: 1,
            }}
          >
            {title}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ mt: 2 }}>
        <Grid container spacing={4}>
          <Grid size={6}>
            <Typography sx={{ color: "text.secondary" }}>
              {truncatedDescription}
            </Typography>
          </Grid>

          <Grid size={6}>
            <Stack spacing={1}>
              <Typography variant="h6" sx={{ fontWeight: "600" }}>
                ${price?.toLocaleString()}
              </Typography>

              <Stack direction="row" spacing={2} alignItems="center">
                <Stack direction="row" spacing={1} alignItems="center">
                  <BedIcon sx={{ color: "text.secondary" }} />
                  <Typography sx={{ color: "text.secondary" }}>
                    {bedrooms} Beds
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <BathtubIcon sx={{ color: "text.secondary" }} />
                  <Typography sx={{ color: "text.secondary" }}>
                    {bathrooms} Baths
                  </Typography>
                </Stack>
              </Stack>

              <Stack direction="row" spacing={1} alignItems="flex-start">
                <LocationOnIcon sx={{ color: "text.secondary", mt: 0.3 }} />
                <Typography sx={{ color: "text.secondary" }}>
                  {address}
                </Typography>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Link>
  );
}
