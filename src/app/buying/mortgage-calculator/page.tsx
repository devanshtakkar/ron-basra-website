'use client';
import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  Grid,
  Button,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import { Listing } from '../../properties/my-listings/types/Listing';
import ListingCard from '../../properties/my-listings/ListingCard';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface MortgageCalculation {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  amortizationSchedule: {
    principal: number;
    interest: number;
    balance: number;
    payment: number;
  }[];
}

export default function MortgageCalculator() {
  const theme = useTheme();
  const isMobile = useMediaQuery('(max-width:900px)');
  const [purchasePrice, setPurchasePrice] = useState<number>(300000);
  const [downPayment, setDownPayment] = useState<number>(60000);
  const [interestRate, setInterestRate] = useState<number>(5.5);
  const [loanTerm, setLoanTerm] = useState<number>(30);
  const [paymentFrequency, setPaymentFrequency] = useState<string>('monthly');
  const [mortgageDetails, setMortgageDetails] = useState<MortgageCalculation | null>(null);
  const [featuredListings, setFeaturedListings] = useState<Listing[]>([]);

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

  const calculateMortgage = () => {
    const principal = purchasePrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    
    const monthlyPayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    const amortizationSchedule = [];
    let balance = principal;
    let totalInterest = 0;

    for (let i = 0; i < numberOfPayments; i++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      
      totalInterest += interestPayment;
      balance -= principalPayment;

      amortizationSchedule.push({
        principal: principalPayment,
        interest: interestPayment,
        balance: Math.max(0, balance),
        payment: monthlyPayment,
      });
    }

    setMortgageDetails({
      monthlyPayment,
      totalPayment: monthlyPayment * numberOfPayments,
      totalInterest,
      amortizationSchedule,
    });
  };

  useEffect(() => {
    calculateMortgage();
  }, [purchasePrice, downPayment, interestRate, loanTerm, paymentFrequency]);

  const barChartData = {
    labels: ['Year 5', 'Year 10', 'Year 15', 'Year 20', 'Year 25', 'Year 30'],
    datasets: [
      {
        label: 'Principal Paid',
        data: mortgageDetails?.amortizationSchedule
          .filter((_, index) => (index + 1) % 60 === 0)
          .map((payment) => 
            (purchasePrice - downPayment - payment.balance)
          ) || [],
        backgroundColor: theme.palette.primary.main,
      },
      {
        label: 'Remaining Balance',
        data: mortgageDetails?.amortizationSchedule
          .filter((_, index) => (index + 1) % 60 === 0)
          .map((payment) => payment.balance) || [],
        backgroundColor: theme.palette.secondary.main,
      },
    ],
  };

  const pieChartData = {
    labels: ['Principal', 'Total Interest'],
    datasets: [
      {
        data: [
          purchasePrice - downPayment,
          mortgageDetails?.totalInterest || 0,
        ],
        backgroundColor: [
          theme.palette.primary.main,
          theme.palette.secondary.main,
        ],
      },
    ],
  };

  return (
    <Container maxWidth="xl" sx={{ py: 8 }}>
      <Typography variant="h2" component="h1" gutterBottom sx={{ mb: 6 }}>
        Mortgage Calculator
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Mortgage Details
            </Typography>
            <Box component="form" sx={{ '& > :not(style)': { mb: 2 } }}>
              <TextField
                fullWidth
                label="Purchase Price"
                type="number"
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(Number(e.target.value))}
                slotProps={{
                  input: {
                    startAdornment: '$',
                  },
                }}
              />
              <TextField
                fullWidth
                label="Down Payment"
                type="number"
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                slotProps={{
                  input: {
                    startAdornment: '$',
                  },
                }}
              />
              <TextField
                fullWidth
                label="Interest Rate"
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                slotProps={{
                  input: {
                    endAdornment: '%',
                  },
                }}
              />
              <TextField
                fullWidth
                label="Loan Term"
                type="number"
                value={loanTerm}
                onChange={(e) => setLoanTerm(Number(e.target.value))}
                slotProps={{
                  input: {
                    endAdornment: 'years',
                  },
                }}
              />
              <FormControl fullWidth>
                <InputLabel>Payment Frequency</InputLabel>
                <Select
                  value={paymentFrequency}
                  label="Payment Frequency"
                  onChange={(e) => setPaymentFrequency(e.target.value)}
                >
                  <MenuItem value="weekly">Weekly</MenuItem>
                  <MenuItem value="biweekly">Bi-Weekly</MenuItem>
                  <MenuItem value="monthly">Monthly</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Paper>

          {mortgageDetails && (
            <Paper sx={{ p: 3, mt: 3 }}>
              <Typography variant="h6" gutterBottom>
                Payment Summary
              </Typography>
              <Box sx={{ '& > :not(style)': { mb: 2 } }}>
                <Typography>
                  Monthly Payment: ${mortgageDetails.monthlyPayment.toFixed(2)}
                </Typography>
                <Typography>
                  Total Payment: ${mortgageDetails.totalPayment.toFixed(2)}
                </Typography>
                <Typography>
                  Total Interest: ${mortgageDetails.totalInterest.toFixed(2)}
                </Typography>
              </Box>
            </Paper>
          )}
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Amortization Schedule
            </Typography>
            <Box sx={{ height: 300 }}>
              <Bar
                data={barChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      stacked: true,
                    },
                    y: {
                      stacked: true,
                      beginAtZero: true,
                    },
                  },
                }}
              />
            </Box>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Principal vs Interest
            </Typography>
            <Box sx={{ height: 300 }}>
              <Pie
                data={pieChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                }}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Featured Listings Section */}
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" gutterBottom color="primary" sx={{ mb: 4 }}>
          Featured Listings
        </Typography>
        <Grid container spacing={3}>
          {featuredListings.map((listing) => (
            <Grid item xs={12} md={4} key={listing.id}>
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
      </Box>
    </Container>
  );
} 