"use client";
import { 
  Box, 
  Container, 
  Stack, 
  Menu,
  MenuItem,
  Button,
  Typography
} from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function DesktopNavbar() {
  const [anchorEls, setAnchorEls] = useState<{ [key: string]: HTMLElement | null }>({});

  const handleClick = (event: React.MouseEvent<HTMLElement>, menuId: string) => {
    setAnchorEls({ ...anchorEls, [menuId]: event.currentTarget });
  };

  const handleClose = (menuId: string) => {
    setAnchorEls({ ...anchorEls, [menuId]: null });
  };

  const menuItems = [
    { title: "Home", path: "/" },
    {
      title: "Properties",
      id: "properties",
      children: [
        { title: "My Listings", path: "/properties/my-listings" },
        { title: "Office Listings", path: "/properties/office-listings" }
      ]
    },
    {
      title: "Buying",
      id: "buying",
      children: [
        { title: "Buying Info", path: "/buying" },
        { title: "Mortgage Calculator", path: "/buying/mortgage-calculator" },
        { title: "Reports", path: "/reports" }
      ]
    },
    {
      title: "Selling",
      id: "selling",
      path: "/selling"
    },
    { title: "Market Reports", path: "/reports" },
    { title: "Blogs", path: "/blogs" },
    { title: "Contact", path: "/contact" }
  ];

  return (
    <Box
      height={70}
      sx={{
        backgroundColor: "#232938",
      }}
    >
      <Container maxWidth="xl">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          height="100%"
        >
          <Box
            sx={{
              position: "relative",
              width: "200px",
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

          <Stack direction="row" spacing={2} alignItems="center">
            {menuItems.map((item) => (
              <Box key={item.title}>
                {item.children ? (
                  <>
                    <Button
                      onClick={(e) => handleClick(e, item.id)}
                      endIcon={<KeyboardArrowDownIcon />}
                      sx={{ 
                        color: 'white',
                        fontSize: '1rem',
                        textTransform: 'none',
                        '&:hover': {
                          backgroundColor: 'transparent',
                          color: '#D4AF37'
                        }
                      }}
                    >
                      {item.title}
                    </Button>
                    <Menu
                      anchorEl={anchorEls[item.id]}
                      open={Boolean(anchorEls[item.id])}
                      onClose={() => handleClose(item.id)}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button',
                      }}
                      sx={{
                        '& .MuiPaper-root': {
                          borderRadius: 2,
                          marginTop: 1,
                          minWidth: 180,
                        }
                      }}
                    >
                      {item.children.map((child) => (
                        <MenuItem 
                          key={child.title}
                          component={Link}
                          href={child.path}
                          onClick={() => handleClose(item.id)}
                          sx={{
                            color: 'black',
                            '&:hover': {
                              color: '#D4AF37',
                              backgroundColor: 'transparent'
                            }
                          }}
                        >
                          {child.title}
                        </MenuItem>
                      ))}
                    </Menu>
                  </>
                ) : (
                  <Link 
                    href={item.path}
                    style={{ 
                      textDecoration: 'none',
                      color: 'white'
                    }}
                  >
                    <Typography 
                      sx={{
                        '&:hover': {
                          color: '#D4AF37'
                        }
                      }}
                    >
                      {item.title}
                    </Typography>
                  </Link>
                )}
              </Box>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
} 