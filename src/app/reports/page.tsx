'use client';

import { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Card, 
  CardContent, 
  Button,
  useTheme,
  useMediaQuery,
  Grid,
  Paper,
  styled
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArticleIcon from '@mui/icons-material/Article';
import '@/app/css/curved_button.css';
import { Listing } from '../properties/my-listings/types/Listing';
import ListingCard from '../properties/my-listings/ListingCard';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginBottom: theme.spacing(4),
  borderRadius: theme.spacing(2),
  background: 'rgb(250, 250, 250)',
  border: '1px solid rgb(242, 242, 242)',
  boxShadow: 'none'
}));

interface Report {
  name: string;
  url: string;
  description: string;
}

export default function ReportsPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [featuredListings, setFeaturedListings] = useState<Listing[]>([]);
  
  const [reports] = useState<Report[]>([
    {
      name: '8 Mistakes to Avoid When Buying a Home',
      url: '/reports/8 Mistakes to Avoid When Buying.pdf',
      description: "You've been saving for awhile, weighing your options, looking around casually. Now you've finally decided to do it - you're ready to buy a house. The process of buying a new home can be incredibly exciting, yet stressful, all at once. Where do you start?"
    },
    {
      name: 'Benefits of Using a Realtor to Sell your Home',
      url: '/reports/Benefits of Using a Realtor.pdf',
      description: "Selling your home is a complex process that can be stressful and time-consuming. An experienced Realtor has the knowledge, skills, and connections to help you through the process every step of the way."
    },
    {
      name: 'The Best Asking Price for your Home',
      url: '/reports/Best Asking Price.pdf',
      description: "Setting a realistic price for your home that reflects current market values will help sell your home quickly and for top dollar. When you price your home properly, you increase the chances that the offer you receive will nearly match your asking price, and that there will be competing offers - which may net you even more in the long run."
    },
    {
      name: 'Buy or Sell First?',
      url: '/reports/Buy or Sell First.pdf',
      description: "If you are considering looking for a new house, and are a current home-owner, then chances are you're wondering what your strategy should be: do you wait to find the perfect new home before you put your current home on the market, or do you sell first and then look around? You have a few options."
    },
    {
      name: '"Drive-Up Appeal": Get your Property Ready to Show',
      url: '/reports/Drive-Up Appeal.pdf',
      description: "When preparing your property to show, work your way from the outside in. It is essential that your home possess a certain \"drive-up appeal\". Remember, a potential buyer's first impression of your house is formed while s/he is still sitting in the realtor's car."
    },
    {
      name: 'Buying a Home: What Expenses to Expect',
      url: '/reports/Expenses to Expect.pdf',
      description: "Budgeting for a new home can be tricky. Not only are there mortgage installments and the down payment to consider, there are a host of other - sometimes unexpected - expenses to add to the equation. The last thing you want is to be caught financially unprepared, blindsided by taxes and other hidden costs on closing day."
    },
    // ... Add other reports with their descriptions
  ]);

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
    <Container maxWidth="xl" sx={{ py: { xs: 6, md: 12 } }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Box textAlign="center" mb={{ xs: 6, md: 12 }}>
            <Typography 
              variant="h2" 
              component="h1" 
              gutterBottom 
              sx={{ 
                mb: 4,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 500
              }}
            >
              Reports
            </Typography>
            <Typography 
              variant="h6" 
              color="text.secondary" 
              sx={{ 
                maxWidth: '3xl', 
                mx: 'auto',
                fontSize: { xs: '1rem', md: '1.25rem' },
                lineHeight: 1.6
              }}
            >
              During the process of buying or selling a home, you'll unearth countless questions. I know how difficult it can be to sift through all the details in order to find answers relevant and meaningful to you. I've put together the following series of reports that provide clear, concise and useful information on a wide range of issues related to real estate. Here you'll find tips on how to save money, real estate insider secrets, renovation advice, and much more.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {reports.map((report) => (
              <Grid item xs={12} key={report.name}>
                <Card 
                  sx={{ 
                    borderRadius: 2,
                    border: '1px solid rgb(242, 242, 242)',
                    background: 'rgb(250, 250, 250)',
                    boxShadow: 'none',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: 'white',
                      borderColor: 'rgb(230, 230, 230)',
                    }
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Box display="flex" alignItems="flex-start" gap={3}>
                      <ArticleIcon 
                        sx={{ 
                          fontSize: 32,
                          color: 'primary.main',
                          opacity: 0.9
                        }} 
                      />
                      <Box flex={1}>
                        <Typography 
                          variant="h5" 
                          gutterBottom 
                          sx={{ 
                            fontWeight: 500,
                            mb: 2,
                            fontSize: '1.25rem'
                          }}
                        >
                          {report.name}
                        </Typography>
                        <Typography 
                          color="text.secondary" 
                          sx={{ 
                            mb: 3,
                            fontSize: '0.95rem',
                            lineHeight: 1.6
                          }}
                        >
                          {report.description}
                        </Typography>
                        <Button
                          href={report.url}
                          download
                          className="btn_white"
                          endIcon={<ArrowForwardIcon />}
                          sx={{
                            fontSize: '0.9rem',
                            py: 1,
                            width: { xs: 'auto', md: '250px' }
                          }}
                        >
                          Get this report
                        </Button>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box sx={{ position: isMobile ? 'relative' : 'sticky', top: 24 }}>
            <StyledPaper>
              <Typography variant="h5" gutterBottom sx={{ mb: 3, fontSize: '1.25rem', fontWeight: 500 }}>
                Featured Listings
              </Typography>
              <Grid container spacing={3}>
                {featuredListings.map((listing) => (
                  <Grid item xs={12} key={listing.id}>
                    <Box sx={{ 
                      background: 'white',
                      borderRadius: 2,
                      overflow: 'hidden',
                      border: '1px solid rgb(242, 242, 242)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        borderColor: 'rgb(230, 230, 230)',
                      }
                    }}>
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
                    </Box>
                  </Grid>
                ))}
              </Grid>
              <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Button
                  href="/properties/my-listings"
                  className="btn_white"
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    fontSize: '0.9rem',
                    py: 1
                  }}
                >
                  View All Listings
                </Button>
              </Box>
            </StyledPaper>
          </Box>
        </Grid>
      </Grid>

      <Box mt={8} textAlign="center">
        <Typography 
          color="text.secondary"
          sx={{
            fontSize: { xs: '1rem', md: '1.1rem' }
          }}
        >
          I'd be happy to personally answer any other questions you may have. Remember, I will be here to assist you every step of the way!
        </Typography>
      </Box>
    </Container>
  );
} 