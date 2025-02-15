"use client";
import { Box, IconButton, Container, Stack, Drawer } from "@mui/material";
import Image from "next/image";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

export default function MobileNavbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
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
            <Image
              src="/images/Ron Basra Logo Gold.png"
              alt="Ron Basra"
              fill
              style={{
                objectFit: "contain",
              }}
            />
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
          '& .MuiDrawer-paper': {
            width: '80%',
            backgroundColor: '#232938',
            color: 'white'
          }
        }}
      >
        <Box p={2}>
          <Box display="flex" justifyContent="flex-end">
            <IconButton 
              onClick={toggleDrawer}
              sx={{ 
                color: 'white',
                '&:hover': {
                  color: '#gold'
                }
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          {/* You can add navigation links or other content here */}
        </Box>
      </Drawer>
    </Box>
  );
}
