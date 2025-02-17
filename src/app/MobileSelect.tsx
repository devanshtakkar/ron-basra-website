"use client";
import { Button } from "@mui/material";

import {
    Box,
    Container,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid2,
    IconButton,
    Radio,
    RadioGroup,
    Stack,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import styles from "./MobileSelect.module.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Drawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

interface MobileSelectProps {
    navigateToProjects: () => void;
    location: string;
    propertyType: string;
    setPropertyType: (value: string) => void;
    setLocation: (value: string) => void;
}

export default function MobileSelect({
    navigateToProjects,
    location,
    propertyType,
    setPropertyType,
    setLocation,
}: MobileSelectProps) {
    const [open, setOpen] = useState(false);
    const [bedrooms, setBedrooms] = useState('any');
    const [bathrooms, setBathrooms] = useState('min1');

    function toggleDrawer() {
        setOpen(!open);
    }

    const bedroomOptions = [
        { value: 'any', label: 'Any' },
        { value: 'min1', label: 'Minimum 1' },
        { value: 'min2', label: 'Minimum 2' },
        { value: 'min3', label: 'Minimum 3' },
        { value: 'min4', label: 'Minimum 4' },
        { value: '4plus', label: '4+' },
    ];

    const bathroomOptions = [
        { value: 'min1', label: 'Minimum 1' },
        { value: 'min2', label: 'Minimum 2' },
        { value: 'min3', label: 'Minimum 3' },
        { value: 'min4', label: 'Minimum 4' },
        { value: '4plus', label: '4+' },
    ];

    const propertyTypeOptions = [
        { value: 'Commercial', label: 'Commercial' },
        { value: 'Land Only', label: 'Land Only' },
        { value: 'Residential Attached', label: 'Residential Attached' },
        { value: 'Residential Detached', label: 'Residential Detached' },
        { value: 'Open House', label: 'Open House' },
    ];

    const locationOptions = [
        { value: 'All Locations', label: 'All Locations' },
        { value: 'Vancouver', label: 'Vancouver' },
        { value: 'Burnaby', label: 'Burnaby' },
        { value: 'Coquitlam', label: 'Coquitlam' },
        { value: 'New Westminster', label: 'New Westminster' },
        { value: 'North Vancouver', label: 'North Vancouver' },
        { value: 'Vancouver Island', label: 'Vancouver Island' },
    ];

    return (
        <>
            <Grid2 container>
                <Grid2 size={9}>
                    <div
                        className={styles.mobile_select_container}
                        onClick={toggleDrawer}
                    >
                        <Grid2 container>
                            <Grid2 size={10}>
                                <Stack
                                    direction="column"
                                    alignItems="flex-start"
                                    justifyContent="space-between"
                                    spacing={1}
                                >
                                    <p
                                        className={
                                            styles.mobile_select_property_type
                                        }
                                    >
                                        {propertyType}
                                    </p>
                                    <p
                                        className={
                                            styles.mobile_select_location
                                        }
                                    >
                                        {location}
                                    </p>
                                </Stack>
                            </Grid2>
                            <Grid2 size={2}>
                                <Stack
                                    direction="column"
                                    alignItems="center"
                                    justifyContent="space-between"
                                    spacing={1}
                                >
                                    <KeyboardArrowUpIcon />
                                    <KeyboardArrowDownIcon />
                                </Stack>
                            </Grid2>
                        </Grid2>
                    </div>
                </Grid2>
                <Grid2 size={3}>
                    <IconButton
                        onClick={navigateToProjects}
                        sx={{
                            backgroundColor: "secondary.main", // Button background color
                            color: "white", // Icon color
                            "&:hover": {
                                backgroundColor: "secondary.dark", // Hover background
                            },
                            padding: "12px", // Adjust padding for better click area
                            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)", // Optional: Add shadow
                            marginLeft: "1rem",
                        }}
                    >
                        <ArrowForwardIcon />
                    </IconButton>
                </Grid2>
            </Grid2>
            <Drawer anchor="bottom" open={open} onClose={toggleDrawer}>
                <Box height="80vh" p={2}>
                    <Container>
                        <Stack
                            direction="row"
                            spacing={2}
                            alignItems={"center"}
                            justifyContent={"space-between"}
                        >
                            <p className="mono_font">VIEW OUR PORTFOLIO</p>
                            <IconButton onClick={toggleDrawer}>
                                <CloseIcon />
                            </IconButton>
                        </Stack>

                        <FormControl fullWidth sx={{ mb: 3 }}>
                            <FormLabel id="bedrooms-label">Bedrooms</FormLabel>
                            <RadioGroup
                                aria-labelledby="bedrooms-label"
                                value={bedrooms}
                                onChange={(e) => setBedrooms(e.target.value)}
                            >
                                {bedroomOptions.map((option) => (
                                    <FormControlLabel
                                        key={option.value}
                                        value={option.value}
                                        control={<Radio color="secondary" />}
                                        label={option.label}
                                    />
                                ))}
                            </RadioGroup>
                        </FormControl>

                        <FormControl fullWidth sx={{ mb: 3 }}>
                            <FormLabel id="bathrooms-label">Bathrooms</FormLabel>
                            <RadioGroup
                                aria-labelledby="bathrooms-label"
                                value={bathrooms}
                                onChange={(e) => setBathrooms(e.target.value)}
                            >
                                {bathroomOptions.map((option) => (
                                    <FormControlLabel
                                        key={option.value}
                                        value={option.value}
                                        control={<Radio color="secondary" />}
                                        label={option.label}
                                    />
                                ))}
                            </RadioGroup>
                        </FormControl>

                        <FormControl fullWidth sx={{ mb: 3 }}>
                            <FormLabel id="property-type-label">Property Type</FormLabel>
                            <RadioGroup
                                aria-labelledby="property-type-label"
                                value={propertyType}
                                onChange={(e) => setPropertyType(e.target.value)}
                            >
                                {propertyTypeOptions.map((option) => (
                                    <FormControlLabel
                                        key={option.value}
                                        value={option.value}
                                        control={<Radio color="secondary" />}
                                        label={option.label}
                                    />
                                ))}
                            </RadioGroup>
                        </FormControl>

                        <FormControl fullWidth sx={{ mb: 3 }}>
                            <FormLabel id="location-label">Location</FormLabel>
                            <RadioGroup
                                aria-labelledby="location-label"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            >
                                {locationOptions.map((option) => (
                                    <FormControlLabel
                                        key={option.value}
                                        value={option.value}
                                        control={<Radio color="secondary" />}
                                        label={option.label}
                                    />
                                ))}
                            </RadioGroup>
                        </FormControl>

                        <Box
                            sx={{
                                position: 'fixed',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                padding: '1rem',
                                backgroundColor: 'white',
                                zIndex: 1300,
                                borderTop: '1px solid rgba(0, 0, 0, 0.1)'
                            }}
                        >
                            <Button
                                variant="contained"
                                color="secondary"
                                fullWidth
                                sx={{
                                    borderRadius: "50px",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    padding: "1rem 1rem",
                                    fontSize: "1.2rem",
                                }}
                                disableElevation
                                disableRipple
                                onClick={navigateToProjects}
                            >
                                Search
                                <ArrowForwardIcon />
                            </Button>
                        </Box>
                    </Container>
                </Box>
            </Drawer>
        </>
    );
}
