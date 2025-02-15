"use client";
import { 
  Box, 
  IconButton, 
  Container, 
  Stack, 
  Drawer,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  List,
  ListItem,
  ListItemText
} from "@mui/material";
import Image from "next/image";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from "react";
import Link from "next/link";

export default function MobileNavbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const menuItems = [
    { title: "Home", path: "/" },
    {
      title: "Properties",
      children: [
        { title: "My Listings", path: "/properties/my-listings" },
        { title: "Office Listings", path: "/properties/office-listings" }
      ]
    },
    {
      title: "Buying",
      children: [
        { title: "Buying Info", path: "/buying/info" },
        { title: "Mortgage Calculator", path: "/buying/mortgage-calculator" },
        { title: "Reports", path: "/buying/reports" }
      ]
    },
    {
      title: "Selling",
      children: [
        { title: "Selling Info", path: "/selling/info" },
        { title: "Reports", path: "/selling/reports" }
      ]
    },
    { title: "Market Reports", path: "/market-reports" },
    { title: "Blogs", path: "/blogs" },
    { title: "Contact", path: "/contact" }
  ];

  const renderMenuItem = (item: any) => {
    if (item.children) {
      return (
        <Accordion 
          sx={{ 
            backgroundColor: 'transparent',
            color: 'white',
            boxShadow: 'none',
            '&:before': {
              display: 'none'
            }
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
            sx={{ 
              padding: 0,
              '& .MuiAccordionSummary-content': {
                margin: '8px 0'
              }
            }}
          >
            <Typography>{item.title}</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: '0 16px' }}>
            <List disablePadding>
              {item.children.map((child: any, index: number) => (
                <ListItem 
                  key={index} 
                  component={Link} 
                  href={child.path}
                  sx={{
                    padding: '4px 0',
                    color: 'white',
                    textDecoration: 'none',
                    '&:hover': {
                      color: '#D4AF37'
                    }
                  }}
                >
                  <ListItemText primary={child.title} />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      );
    }

    return (
      <ListItem 
        component={Link} 
        href={item.path}
        sx={{
          padding: '8px 0',
          color: 'white',
          textDecoration: 'none',
          '&:hover': {
            color: '#D4AF37'
          }
        }}
      >
        <ListItemText primary={item.title} />
      </ListItem>
    );
  };

  return (
    <Box
      height={70}
      sx={{
        backgroundColor: "#232938",
      }}
    >
      <Container>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Box
            sx={{
              position: "relative",
              width: "30%",
              height: 60,
            }}
          >
            <Link href="/">
              <Image
                src="/images/Ron Basra Logo Gold.png"
                alt="Ron Basra"
                fill
                style={{
                  objectFit: "contain",
                }}
              />
            </Link>
          </Box>
          <IconButton sx={{ color: "white" }} onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
        </Stack>
      </Container>

      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={toggleDrawer}
        sx={{
          "& .MuiDrawer-paper": {
            width: "80%",
            backgroundColor: "#232938",
            color: "white",
          },
        }}
      >
        <Box p={2}>
          <Box display="flex" justifyContent="flex-end">
            <IconButton
              onClick={toggleDrawer}
              sx={{
                color: "white",
                "&:hover": {
                  color: "#D4AF37",
                },
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <List sx={{ mt: 2 }}>
            {menuItems.map((item, index) => (
              <Box key={index}>
                {renderMenuItem(item)}
              </Box>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}
