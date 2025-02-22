"use client";
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { Listing } from "../properties/my-listings/types/Listing";
import ListingCard from "../properties/my-listings/ListingCard";
import CurvedButton from "../components/CurvedButton";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Link from "next/link";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginBottom: theme.spacing(4),
  borderRadius: theme.spacing(2),
  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  paddingLeft: 0,
  "&::before": {
    content: '"•"',
    marginRight: theme.spacing(2),
    color: theme.palette.primary.main,
  },
}));

export default function BuyingInfo() {
  const [featuredListings, setFeaturedListings] = useState<Listing[]>([]);
  const isMobile = useMediaQuery("(max-width:900px)");

  useEffect(() => {
    const fetchFeaturedListings = async () => {
      try {
        const response = await fetch("/api/listings?limit=3");
        const data = await response.json();
        setFeaturedListings(data);
      } catch (error) {
        console.error("Error fetching featured listings:", error);
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
            Buyer&apos;s Guide
          </Typography>

          {/* Preparing Your Home Section */}
          <StyledPaper>
            <Typography variant="h4" gutterBottom color="primary">
              Preparing Your Home for Selling
            </Typography>
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{ fontStyle: "italic", mb: 3 }}
            >
              &quot;You never get a second chance at a first impression.&quot;
            </Typography>
            <Typography paragraph>
              Our team will walk you through our step-by-step guide to get your
              house into selling shape, and you&apos;ll be well on your way to a
              successful sale!
            </Typography>
            <List>
              {[
                "Pre-Inspection from a certified home inspector",
                "Making sure all the deficiencies have been completed",
                "Declutter",
                "Paint & perform minor repairs",
                "Put away personal photos",
                "Landscaping, including all edges",
                "Clean your gutters",
                "Ensure all lights are working",
                "Eliminate home odors",
                "Pressure wash the sidewalks",
                "Leave the home during showings",
                "Consider getting the home professionally staged",
              ].map((item: string, index: number) => (
                <StyledListItem key={index}>
                  <ListItemText primary={item} />
                </StyledListItem>
              ))}
            </List>
          </StyledPaper>

          {/* Costs Sections */}
          <StyledPaper>
            <Typography variant="h4" gutterBottom color="primary">
              Understanding Your Costs
            </Typography>
            <Typography paragraph>
              Budgeting for a new home can be tricky. Not only are there
              mortgage installments and the down payment to consider, but there
              are a host of other—sometimes unexpected—expenses to add to the
              equation. Our team will guide you through the process to determine
              which costs will apply to your situation prior to structuring your
              budget.
            </Typography>

            {/* One-Time Costs */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" gutterBottom color="primary">
                One-Time Costs
              </Typography>
              <List>
                {[
                  "Lawyer or Notary (Lawyers can give legal advice; Notaries can&apos;t)",
                  "Property Transfer Tax (1% on $200,000; 2% from $200,000-$2M; 3% greater than $2M on fair market value)",
                  "Down Payment & Deposits (typical deposit is 5% due at the time of subject removal)",
                  "CMHC Fees (if down payment is 19% or less)",
                  "Home Inspection",
                  "GST - if the property hasn&apos;t been lived in",
                  "Survey - if applicable",
                  "Title Insurance",
                  "Adjustments - for example, property tax, insurance",
                  "Appraisal Fees (majority of times are paid by the bank)",
                  "Application Fees, Broker Fees - if applicable",
                  "Elevator, Moving-In Fees - if strata and if applicable",
                  "Foreign Tax",
                ].map((item: string, index: number) => (
                  <StyledListItem key={index}>
                    <ListItemText primary={item} />
                  </StyledListItem>
                ))}
              </List>
            </Box>

            {/* Monthly Costs */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" gutterBottom color="primary">
                Monthly Costs
              </Typography>
              <List>
                {[
                  "Mortgage Payments - could be weekly, semi-monthly, monthly (Impacts your principal)",
                  "Strata or Maintenance Fees - if applicable",
                  "Hydro",
                  "Gas",
                  "Utilities (internet, cable)",
                ].map((item: string, index: number) => (
                  <StyledListItem key={index}>
                    <ListItemText primary={item} />
                  </StyledListItem>
                ))}
              </List>
            </Box>

            {/* Periodic Costs */}
            <Box>
              <Typography variant="h5" gutterBottom color="primary">
                Quarterly, Semi-Yearly, Yearly Costs
              </Typography>
              <List>
                {[
                  "Water Utilities - depending on your city",
                  "Property Taxes - you have the option to pay monthly or twice every year",
                  "Insurance - you have the option to pay monthly or yearly",
                  "Extra insurance - for example, water issues",
                ].map((item: string, index: number) => (
                  <StyledListItem key={index}>
                    <ListItemText primary={item} />
                  </StyledListItem>
                ))}
              </List>
            </Box>
          </StyledPaper>

          {/* Buying Process Section */}
          <StyledPaper>
            <Typography variant="h4" gutterBottom color="primary">
              The Buying Process
            </Typography>
            <Typography paragraph>
              Let me help you every step of the way. When purchasing a home, you
              are faced with a multitude of decisions! The primary one is
              whether you are actually prepared to purchase a home. Locating the
              perfect home is not always an easy task, and obtaining a mortgage
              loan can be a complex and tiring process. Although, once you have
              determined that you are ready to move forward with the required
              effort towards your home-purchasing goal, the rewards are
              unquestionable.
            </Typography>

            <Typography
              variant="h5"
              gutterBottom
              color="primary"
              sx={{ mt: 4 }}
            >
              Your First Step
            </Typography>
            <Typography paragraph>
              Your first step to buying a home is to first ask yourself why you
              want to buy a home: to stop paying rent? To start building equity?
              To have a place of your own? To raise a family? To entertain
              business associates? To move up to a bigger house? Next, list what
              kind of home you&apos;d like and where you would like to be. Be
              specific. Separate the &quot;must haves&quot; from the &quot;want
              to haves.&quot;
            </Typography>

            <Typography
              variant="h5"
              gutterBottom
              color="primary"
              sx={{ mt: 4 }}
            >
              Loan Pre-Qualification
            </Typography>
            <Typography paragraph>
              Once you have addressed the above needs, your next step in the
              purchasing process is to get pre-qualified with a mortgage
              company. This can be done over the phone or even online in a
              matter of minutes. Call me and I will refer you to a mortgage
              professional that has an excellent reputation and track record for
              successfully acquiring loan approval for their clients.
            </Typography>

            <Typography
              variant="h5"
              gutterBottom
              color="primary"
              sx={{ mt: 4 }}
            >
              Finding Your Perfect Home
            </Typography>
            <Typography paragraph>
              Once you&apos;ve been pre-qualified and know what price range you
              want to stay in, I can help you determine which properties fit
              your needs by using the (MLS) Multiple Listing Service system to
              locate them. I have the best possible resources and communication
              systems available today to help you locate the homes on the market
              that match your specifications.
            </Typography>

            <Typography
              variant="h5"
              gutterBottom
              color="primary"
              sx={{ mt: 4 }}
            >
              Our Commitment
            </Typography>
            <Typography paragraph>
              I will help you complete your financing and inspections, and close
              on the transaction. My top priority is to make sure that your home
              buying experience is pleasant, cost-efficient, and successful.
            </Typography>
          </StyledPaper>
        </Grid>

        {/* Featured Listings Sidebar */}
        <Grid item xs={12} md={4}>
          <Box sx={{ position: isMobile ? "relative" : "sticky", top: 24 }}>
            <StyledPaper>
              <Typography
                variant="h5"
                gutterBottom
                color="primary"
                sx={{ mb: 3 }}
              >
                Featured Listings
              </Typography>
              <Grid container spacing={2}>
                {featuredListings.map((listing) => (
                  <Grid item xs={12} key={listing.id}>
                    <ListingCard
                      image={
                        listing.photos[0]?.downloadUrl ||
                        "/images/placeholder.jpg"
                      }
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
              <Box sx={{ mt: 4, textAlign: "center" }}>
                <CurvedButton
                  href="/properties/my-listings"
                  endIcon={<ArrowForwardIcon />}
                >
                  View All Listings
                </CurvedButton>
              </Box>
            </StyledPaper>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
