"use client"
import React from "react";
import { Box, Container, Typography, useTheme } from "@mui/material";
import { styled } from "@mui/system";
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

const TestimonialContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(2),
  marginBottom: theme.spacing(6),
  '&:last-child': {
    marginBottom: 0
  }
}));

const QuoteIcon = styled(FormatQuoteIcon)(({ theme }) => ({
  color: theme.palette.primary.main,
  opacity: 0.2,
  fontSize: '2rem',
  marginBottom: theme.spacing(2)
}));

const TestimonialSection: React.FC = () => {
  const theme = useTheme();

  const testimonials = [
    {
      text: "For those who are looking for a good realtor Ron is the person to go to. Ron is very helpful and friendly and always takes the time to answer the phone or call right back if he couldn't. Couldn't have asked for a better experience I would definitely recommend him to sellers and buyers.",
    },
    {
      text: "Very professional and a friendly individual. Likes to work closely with you from day one till the closing. Ron is always very responsive when I call and understands your needs. Keep up the good work!",
    },
    {
      text: "Ron was absolutely outstanding. Knowledgeable, polite, personable. We personally wouldn't work with anyone else. Ron's attention to detail and having our best interest in mind made this experience so much easier.",
    },
  ];

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: 'background.default',
      }}
    >
      <Container maxWidth="lg">
        <Typography 
          variant="h2"
          sx={{
            textAlign: 'center',
            mb: 8,
            fontSize: { xs: '2rem', md: '2.5rem' },
            fontWeight: 500,
          }}
        >
          What Our Customers Say
        </Typography>
        
        {testimonials.map((testimonial, index) => (
          <TestimonialContainer key={index}>
            <QuoteIcon />
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '1.1rem', md: '1.25rem' },
                lineHeight: 1.8,
                maxWidth: '800px',
                margin: '0 auto',
                color: 'text.primary',
                textAlign: 'left',
                pl: { xs: 0, md: 4 },
              }}
            >
              {testimonial.text}
            </Typography>
          </TestimonialContainer>
        ))}
      </Container>
    </Box>
  );
};

export default TestimonialSection;