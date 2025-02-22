'use client';
import { Container, Typography, Box, Grid, Paper, List, ListItem, ListItemText, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { Listing } from '../properties/my-listings/types/Listing';
import ListingCard from '../properties/my-listings/ListingCard';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginBottom: theme.spacing(4),
  borderRadius: theme.spacing(2),
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  paddingLeft: 0,
  '&::before': {
    content: '"•"',
    marginRight: theme.spacing(2),
    color: theme.palette.primary.main,
  },
}));

export default function SellingInfo() {
  const [featuredListings, setFeaturedListings] = useState<Listing[]>([]);
  const isMobile = useMediaQuery('(max-width:900px)');

  useEffect(() => {
    const fetchFeaturedListings = async () => {
      try {
        const response = await fetch('/api/listings?limit=3');
        const data = await response.json();
        setFeaturedListings(data);
      } catch (error) {
        console.error('Error fetching featured listings:', error);
      }
    };

    fetchFeaturedListings();
  }, []);

  return (
    <Container maxWidth="xl" sx={{ py: 8 }}>
      <Grid container spacing={4}>
        {/* Main Content */}
        <Grid item xs={12} md={8}>
          <Typography variant="h2" component="h1" gutterBottom sx={{ mb: 6 }}>
            Seller&apos;s Guide
          </Typography>

          {/* Introduction Section */}
          <StyledPaper>
            <Typography variant="h4" gutterBottom color="primary">
              Selling Your Home
            </Typography>
            <Typography paragraph>
              Your home is likely your largest asset, so selling it requires significant thought and strategy. Our team will help get your property into top selling shape before it hits the market in order to increase its chances of selling within the desired timeframe and drawing top dollar.
            </Typography>
          </StyledPaper>

          {/* Costs Section */}
          <StyledPaper>
            <Typography variant="h4" gutterBottom color="primary">
              Costs for the Seller
            </Typography>
            <Typography paragraph>
              Understanding the costs involved in selling your home is crucial for proper financial planning. Here are the main expenses you should consider:
            </Typography>
            <List>
              {[
                'Real Estate Fees',
                'Conveyancing Fees from Lawyer or Notary',
                'Mortgage Penalty (if any)',
                'Capital Gains - if your home is a rental property',
                'GST - if your home has never been lived in',
                'Empty Home Tax (if any)',
                'Speculation Tax (if any)',
                'Moving Cost in general',
              ].map((item: string, index: number) => (
                <StyledListItem key={index}>
                  <ListItemText primary={item} />
                </StyledListItem>
              ))}
            </List>
          </StyledPaper>

          {/* Why Homes Don't Sell Section */}
          <StyledPaper>
            <Typography variant="h4" gutterBottom color="primary">
              Top Reasons Why a Home Doesn&apos;t Sell
            </Typography>
            <List>
              {[
                'Overpriced (pricing it right to begin with)',
                'Location of the home/area',
                'The home itself',
                'Seller - not being reasonable with showings and not listening to the realtor',
                'Realtor',
              ].map((item: string, index: number) => (
                <StyledListItem key={index}>
                  <ListItemText primary={item} />
                </StyledListItem>
              ))}
            </List>
          </StyledPaper>

          {/* Required Documents Section */}
          <StyledPaper>
            <Typography variant="h4" gutterBottom color="primary">
              Required Documents
            </Typography>
            <Typography paragraph>
              To ensure a smooth selling process, we may require the following documents:
            </Typography>
            <List>
              {[
                'Identification',
                'Filled out Property Disclosure Statement',
                'Rental Agreement (if any)',
                'Occupancy Permit',
                'Approved Building Plans (if any)',
                'Builder License (if any)',
                'Developer License (if any)',
                'Energy Guide (if any)',
                'Insurance Information',
                'Warranty Information - 1/2/5/10 warranty',
                'Any Manuals for Appliances, etc.',
                'Receipts for Renovations (if applicable)',
                'Strata Documents / Strata Login Information (if applicable)',
              ].map((item: string, index: number) => (
                <StyledListItem key={index}>
                  <ListItemText primary={item} />
                </StyledListItem>
              ))}
            </List>
          </StyledPaper>

          {/* Marketing Strategy Section */}
          <StyledPaper>
            <Typography variant="h4" gutterBottom color="primary">
              Our Marketing Strategy
            </Typography>
            <Typography paragraph>
              I will work for you every step of the way! My combination of skill, experience, and technology ensures that I can sell your home for the highest possible price and in the shortest period of time. I have the tools to meet the demands of a highly competitive, modern market.
            </Typography>

            <Typography variant="h5" gutterBottom color="primary" sx={{ mt: 4 }}>
              24/7 Online Presence
            </Typography>
            <Typography paragraph>
              My online marketing system allows me to make information accessible 24-hours a day, and to respond immediately and directly to each and every prospective buyer. From my website, prospective buyers can get information immediately about your home. Through my Personal Home Search, your listing will be sent by e-mail to every prospective buyer in my database, where your home meets their criteria.
            </Typography>

            <Typography variant="h5" gutterBottom color="primary" sx={{ mt: 4 }}>
              Traditional Marketing
            </Typography>
            <Typography paragraph>
              As soon as you list your home with me, I will enter your home in the Multiple Listing Service® (MLS®) database. Other agents can immediately access your property information by computer. Plus, your property will be included in any printed MLS® books. I also regularly publish in magazines and newspapers in the area and send out direct mail pieces to potential buyers.
            </Typography>

            <Typography variant="h5" gutterBottom color="primary" sx={{ mt: 4 }}>
              Pricing Your Home
            </Typography>
            <Typography paragraph>
              When you think about it, there are several other homes for sale competing with your home. I will help you price your home competitively to attract qualified buyers. The way I do this is by generating a Comparative Market Analysis (CMA) report, which will show you a range of prices being paid for homes in your area.
            </Typography>
          </StyledPaper>
        </Grid>

        {/* Featured Listings Sidebar */}
        <Grid item xs={12} md={4}>
          <Box sx={{ position: isMobile ? 'relative' : 'sticky', top: 24 }}>
            <StyledPaper>
              <Typography variant="h5" gutterBottom color="primary" sx={{ mb: 3 }}>
                Featured Listings
              </Typography>
              <Grid container spacing={2}>
                {featuredListings.map((listing) => (
                  <Grid item xs={12} key={listing.id}>
                    <ListingCard
                      image={listing.photos[0]?.downloadUrl || '/images/placeholder.jpg'}
                      title={listing.title}
                      status={listing.mainSummary.status}
                      href={`/properties/${listing.id}`}
                      description={listing.description}
                      propertyType={listing.mainSummary.propertyType}
                      mls={listing.mainSummary.MLS}
                      bedrooms={listing.mainSummary.bedrooms}
                      bathrooms={listing.mainSummary.bathrooms}
                      price={listing.price || 0}
                    />
                  </Grid>
                ))}
              </Grid>
            </StyledPaper>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
} 