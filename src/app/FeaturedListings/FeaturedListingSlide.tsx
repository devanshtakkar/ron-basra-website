import { Box, Stack, Typography } from "@mui/material";
import "../css/status_chip.css";
import Image from "next/image";
import BedIcon from '@mui/icons-material/Bed';
import BathtubIcon from '@mui/icons-material/Bathtub';

interface FeaturedListingSlideProps {
    status: string;
    propertyType: string;
    title: string;
    mls: string;
    bedrooms: number;
    bathrooms: number;
    background: string;
}

export default function FeaturedListingSlide({
    status,
    propertyType,
    title,
    mls,
    bedrooms,
    bathrooms,
    background,
}: FeaturedListingSlideProps) {
    return (
        <Box
            sx={{
                aspectRatio: "1/1",
                backgroundColor: "darkgray",
                padding: "1rem",
                borderRadius: 5,
                position: "relative",
                "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
                    pointerEvents: "none",
                    zIndex: 9,
                },
            }}
        >
            <Image
                src={background}
                alt={title}
                fill
                style={{ objectFit: "cover", borderRadius: 7 }}
            />
            <Stack
                direction="row"
                spacing={1}
                sx={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    zIndex: 20,
                }}
            >
                <div className="status_chip">{status}</div>
                <div className="status_chip">{propertyType}</div>
            </Stack>

            <Box sx={{ position: "absolute", bottom: "10px", zIndex: 20, width: "90%" }}>
                <Typography sx={{ color: "white", fontSize: "0.9rem", mb: 0.5 }}>
                    MLS® {mls}
                </Typography>
                <Typography sx={{ color: "white", fontSize: "1.2rem", fontWeight: "400", mb: 1 }}>
                    {title}
                </Typography>
                <Stack direction="row" spacing={2}>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                        <BedIcon sx={{ color: "white", fontSize: "1.2rem" }} />
                        <Typography sx={{ color: "white", fontSize: "0.9rem" }}>
                            {bedrooms}
                        </Typography>
                    </Stack>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                        <BathtubIcon sx={{ color: "white", fontSize: "1.2rem" }} />
                        <Typography sx={{ color: "white", fontSize: "0.9rem" }}>
                            {bathrooms}
                        </Typography>
                    </Stack>
                </Stack>
            </Box>
        </Box>
    );
}
