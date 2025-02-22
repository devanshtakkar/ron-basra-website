"use client";
import { Box, Tabs, Tab, Alert, List, ListItem, ListItemText, Typography, Grid, CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import {
    APIProvider,
    Map,
    MapCameraChangedEvent,
    useMapsLibrary,
    Marker,
    AdvancedMarker,
} from "@vis.gl/react-google-maps";
import HomeIcon from '@mui/icons-material/Home';

interface Place {
    name: string;
    location: google.maps.LatLng;
    vicinity: string;
    type: string;
}

interface MapContentProps {
    coordinates: { lat: number; lng: number };
    value: number;
}


// Custom marker components
const PropertyMarker = () => {
    return (
        <div style={{
            width: '32px',
            height: '32px',
            background: 'white',
            border: '2px solid rgb(213, 222, 236)',
            borderRadius: '50%',
            boxShadow: '0 0 0 2px red',
            cursor: 'pointer',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <HomeIcon sx={{ 
                color: '#c9b37c',
                fontSize: '18px'
            }} />
        </div>
    );
};

const PlaceMarker = ({ type }: { type: string }) => {
    // Define colors for different place types
    const colors = {
        school: '#4CAF50',
        restaurant: '#FF5722',
        park: '#8BC34A',
        shopping_mall: '#2196F3',
        store: '#2196F3',
        default: '#757575'
    };

    const color = colors[type as keyof typeof colors] || colors.default;

    return (
        <div style={{
            width: '16px',
            height: '16px',
            background: color,
            border: '2px solid #fff',
            borderRadius: '50%',
            boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
            cursor: 'pointer',
            transform: 'translate(-50%, -50%)'
        }} />
    );
};

function MapContent({ coordinates, value }: MapContentProps) {
    const placesLib = useMapsLibrary("places");
    const coreLib = useMapsLibrary("core");
    const [places, setPlaces] = useState<Place[]>([]);
    const [loading, setLoading] = useState(false);
    const [librariesLoaded, setLibrariesLoaded] = useState(false);

    const placeTypes = [
        [], // All - will be handled separately
        ["school"],
        ["restaurant"],
        ["park"],
        ["shopping_mall", "store"]
    ];

    useEffect(() => {
        if (placesLib && coreLib) {
            setLibrariesLoaded(true);
        }
    }, [placesLib, coreLib]);

    const getPlaceType = (place: google.maps.places.PlaceResult): string => {
        if (!place.types || place.types.length === 0) return 'default';
        
        const type = place.types[0];
        if (type === 'school' || 
            type === 'restaurant' || 
            type === 'park' || 
            type === 'shopping_mall' || 
            type === 'store') {
            return type;
        }
        return 'default';
    };

    useEffect(() => {
        if (!librariesLoaded || !coordinates) return;

        const searchPlaces = async () => {
            setLoading(true);
            const service = new placesLib!.PlacesService(
                document.createElement("div")
            );
            
            const searchTypes = value === 0 
                ? ["school", "restaurant", "park", "shopping_mall", "store"]
                : placeTypes[value];

            const request = {
                location: new coreLib!.LatLng(coordinates.lat, coordinates.lng),
                radius: 1000,
                type: searchTypes[0]
            };

            service.nearbySearch(
                request,
                (
                    results: google.maps.places.PlaceResult[] | null,
                    status: google.maps.places.PlacesServiceStatus
                ) => {
                    if (status === "OK" && results) {
                        const formattedPlaces: Place[] = results.map((place) => ({
                            name: place.name || "",
                            location: place.geometry?.location as google.maps.LatLng,
                            vicinity: place.vicinity || "",
                            type: getPlaceType(place)
                        }));
                        setPlaces(formattedPlaces);
                    }
                    setLoading(false);
                }
            );
        };

        searchPlaces();
    }, [value, librariesLoaded, coordinates, placesLib, coreLib]);

    if (!librariesLoaded) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Grid container spacing={2} >
            <Grid item xs={12} md={6}>
                <List sx={{ maxHeight: {xs: 300, md: "80vh"}, overflow: "auto", width: "100%" }}>
                    {loading ? (
                        <ListItem>
                            <ListItemText primary="Loading places..." />
                        </ListItem>
                    ) : places.length === 0 ? (
                        <ListItem>
                            <ListItemText primary="No places found in this area" />
                        </ListItem>
                    ) : (
                        places.map((place, index) => (
                            <ListItem key={index} divider>
                                <ListItemText
                                    primary={place.name}
                                    secondary={place.vicinity}
                                />
                            </ListItem>
                        ))
                    )}
                </List>
            </Grid>
            <Grid item xs={12} md={6} sx={{height: {xs: "50vh", md: "80vh"}}}>
                <Map
                    defaultCenter={coordinates}
                    defaultZoom={15}
                    gestureHandling="greedy"
                    disableDefaultUI={false}
                    // styles={mapStyle}
                    mapId="500eb6c7cc9f218e"
                >
                    {/* Property location marker */}
                    <AdvancedMarker position={coordinates}>
                        <PropertyMarker />
                    </AdvancedMarker>
                    {/* Nearby places markers */}
                    {places.map((place, index) => (
                        <AdvancedMarker
                            key={index}
                            position={{
                                lat: place.location.lat(),
                                lng: place.location.lng()
                            }}
                        >
                            <PlaceMarker type={place.type} />
                        </AdvancedMarker>
                    ))}
                </Map>
            </Grid>
        </Grid>
    );
}

export default function NeighbourhoodMap({
    coordinates,
}: {
    coordinates: { lat: number; lng: number };
}) {
    const [value, setValue] = useState(0);
    let mapsKey = "AIzaSyB_6SRRCx57DgjwnuWfD6Vtux6tPa-AC0Q";

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    if(!mapsKey) {
        return <Alert severity="error">No API key</Alert>;
    }

    return (
        <APIProvider apiKey={mapsKey}>
            <Box sx={{ width: "100%", marginTop: 10 }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        variant="scrollable"
                        scrollButtons="auto"
                        allowScrollButtonsMobile
                        aria-label="neighbourhood categories"
                    >
                        <Tab label="All" />
                        <Tab label="Schools" />
                        <Tab label="Restaurants" />
                        <Tab label="Parks" />
                        <Tab label="Shopping" />
                    </Tabs>
                </Box>
            </Box>
            <MapContent coordinates={coordinates} value={value} />
        </APIProvider>
    );
}
