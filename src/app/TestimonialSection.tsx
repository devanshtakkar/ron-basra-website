"use client"
import React from "react";
import { Box, Grid, Card, CardContent, Typography, useTheme } from "@mui/material";
import { styled } from "@mui/system";

// Styled components for custom styling
const TestimonialCard = styled(Card)(({ theme }) => ({
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(3),
  textAlign: "center",
  border: `1px solid ${theme.palette.divider}`,
}));

const TestimonialText = styled(Typography)(({ theme }) => ({
  fontStyle: "italic",
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(2),
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
        py: 8,
        px: 4,
        textAlign: "center",
      }}
    >
      <h2 className="heading_4r">What Our Customers Say</h2>
      <Grid container spacing={4} justifyContent="center">
        {testimonials.map((testimonial, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <TestimonialCard>
              <CardContent>
                <TestimonialText variant="body1">
                  "{testimonial.text}"
                </TestimonialText>
              </CardContent>
            </TestimonialCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TestimonialSection;