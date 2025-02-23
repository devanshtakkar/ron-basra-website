"use client";
import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Slider,
  Alert,
  Breadcrumbs,
  RadioGroup,
  FormControlLabel,
  Radio,
  Pagination,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useTheme } from "@mui/material/styles";
import ListingCard from "./ListingCard";
import { Listing } from "./types/Listing";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

export default function MyListings() {
  const theme = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Initialize state from URL parameters
  const [listings, setListings] = useState<Listing[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || 1
  );
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    minPrice: Number(searchParams.get("minPrice")) || 0,
    maxPrice: Number(searchParams.get("maxPrice")) || 10000000,
    propertyType: searchParams.get("propertyType") || "all",
    bedrooms: searchParams.get("bedrooms") || "all",
    bathrooms: searchParams.get("bathrooms") || "all",
    searchTerm: searchParams.get("searchTerm") || "",
  });

  // Update URL when filters or pagination changes
  const updateURL = (newFilters: typeof filters, page: number) => {
    const params = new URLSearchParams();
    params.set("page", page.toString());
    params.set("minPrice", newFilters.minPrice.toString());
    params.set("maxPrice", newFilters.maxPrice.toString());
    params.set("propertyType", newFilters.propertyType);
    params.set("bedrooms", newFilters.bedrooms);
    params.set("bathrooms", newFilters.bathrooms);
    if (newFilters.searchTerm) {
      params.set("searchTerm", newFilters.searchTerm);
    }
    
    // Update URL without refreshing the page
    router.replace(`/properties/my-listings?${params.toString()}`);
  };

  useEffect(() => {
    fetchListings();
    updateURL(filters, currentPage);
  }, [filters, currentPage]);

  const fetchListings = async () => {
    try {
      setLoading(true);
      setError(null);
      const queryParams = new URLSearchParams({
        minPrice: filters.minPrice.toString(),
        maxPrice: filters.maxPrice.toString(),
        propertyType: filters.propertyType,
        bedrooms: filters.bedrooms,
        bathrooms: filters.bathrooms,
        searchTerm: filters.searchTerm,
        page: currentPage.toString(),
        limit: "9",
      });

      const response = await fetch(`/api/listings?${queryParams}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch listings");
      }

      setListings(data.listings);
      setTotalPages(data.totalPages);

    } catch (error) {
      console.error("Error fetching listings:", error);
      setError(
        error instanceof Error
          ? error.message
          : "An error occurred while fetching listings"
      );
      setListings([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (field: string, value: string | number) => {
    const newFilters = {
      ...filters,
      [field]: value,
    };
    setCurrentPage(1);
    setFilters(newFilters);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  return (
    <Container maxWidth="xl">      
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
            textDecoration: "none",
          }}
        >
          MY LISTINGS
        </Link>
      </Breadcrumbs>

      <Grid container spacing={3} mb={10}>
        <Grid size={{ xs: 12, md: 6 }}>
          <h1 className="heading_4r">My Listings</h1>
          <FormControl component="fieldset">
            <RadioGroup
              row
              value={filters.propertyType}
              onChange={(e) => handleFilterChange("propertyType", e.target.value)}
            >
              <FormControlLabel 
                value="all" 
                control={<Radio />} 
                label="All" 
              />
              <FormControlLabel 
                value="Residential Attached" 
                control={<Radio />} 
                label="Residential Attached" 
              />
              <FormControlLabel 
                value="Residential Detached" 
                control={<Radio />} 
                label="Residential Detached" 
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <p>
            As a trusted real estate agent, I offer a diverse range of properties
            across B.C.'s most sought-after markets. Whether you're looking for a
            condo or a rental property, my listings are designed to meet your needs
            and enhance your lifestyle.
          </p>
          
          <Box sx={{ mt: 3}}>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <TextField
                  fullWidth
                  label="Search"
                  value={filters.searchTerm}
                  onChange={(e) => handleFilterChange("searchTerm", e.target.value)}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <FormControl fullWidth>
                  <InputLabel>Bedrooms</InputLabel>
                  <Select
                    value={filters.bedrooms}
                    label="Bedrooms"
                    onChange={(e) => handleFilterChange("bedrooms", e.target.value)}
                  >
                    <MenuItem value="all">Any</MenuItem>
                    <MenuItem value="1">1</MenuItem>
                    <MenuItem value="2">2</MenuItem>
                    <MenuItem value="3">3</MenuItem>
                    <MenuItem value="4">4</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <FormControl fullWidth>
                  <InputLabel>Bathrooms</InputLabel>
                  <Select
                    value={filters.bathrooms}
                    label="Bathrooms"
                    onChange={(e) => handleFilterChange("bathrooms", e.target.value)}
                  >
                    <MenuItem value="all">Any</MenuItem>
                    <MenuItem value="1">1</MenuItem>
                    <MenuItem value="2">2</MenuItem>
                    <MenuItem value="3">3</MenuItem>
                    <MenuItem value="4">4</MenuItem>
                    <MenuItem value="5">5</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Typography gutterBottom>Price Range</Typography>
                <Slider
                  value={[filters.minPrice, filters.maxPrice]}
                  onChange={(_, newValue) => {
                    if (Array.isArray(newValue)) {
                      setFilters((prev) => ({
                        ...prev,
                        minPrice: newValue[0],
                        maxPrice: newValue[1],
                      }));
                    }
                  }}
                  valueLabelDisplay="auto"
                  min={0}
                  max={10000000}
                  step={50000}
                  valueLabelFormat={(value) => `$${value.toLocaleString()}`}
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>

      {/* Error Message */}
      {error && (
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      )}

      {/* Loading Message */}
      {loading && (
        <Box sx={{ mb: 4 }}>
          <Typography>Loading listings...</Typography>
        </Box>
      )}

      {/* No Results Message */}
      {!loading && !error && listings.length === 0 && (
        <Alert severity="info" sx={{ mb: 4 }}>
          No listings found matching your criteria.
        </Alert>
      )}

      {/* Listings Grid */}
      <Grid container spacing={3}>
        {listings.map((listing) => (
          <Grid key={listing.id} size={{ xs: 12, md: 4 }}>
            <ListingCard
              image={listing.photos[0]?.downloadUrl || "/images/placeholder.jpg"}
              title={listing.title}
              status={listing.mainSummary.status}
              href={`/properties/${listing.id}`}
              description={listing.description}
              year_built={listing.mainSummary.yearBuilt?.toString()}
              lot_size={listing.generalInfo?.["Total area"]}
              propertyType={listing.mainSummary.propertyType}
              mls={listing.mainSummary.MLS}
              bedrooms={listing.mainSummary.bedrooms}
              bathrooms={listing.mainSummary.bathrooms}
              price={listing.price || 0}
            />
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      {!loading && !error && listings.length > 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 4 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            size="large"
          />
        </Box>
      )}
    </Container>
  );
}
