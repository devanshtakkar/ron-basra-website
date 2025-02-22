"use client";

import { Box, Container, Grid2, TextField, Button, Stack } from "@mui/material";
import Breadcrumb from "./Breadcrumb";
import { useState } from "react";
import styles from "./styles.module.css";
import Image from "next/image";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission here in the future
        console.log(formData);
    };

    return (
        <>
            <Container sx={{ paddingBottom: "4rem", marginTop: "4rem" }}>
                <Breadcrumb />
                <Box 
                    sx={{
                        position: 'relative',
                        width: '100%',
                        height: { xs: 300, md: 600 },
                        marginY: '4rem',
                        overflow: 'hidden'
                    }}
                >
                    <Image
                        src="/images/ron-with-clients.jpg"
                        alt="Ron Basra with clients"
                        fill
                        style={{ objectFit: 'cover' }}
                        priority
                    />
                </Box>
                <Grid2 container spacing={7}>
                    <Grid2 size={{ xs: 12, md: 6 }}>
                        <h2 className="heading_3r">Ron Basra</h2>
                        <p className={styles.light_text}>
                            When it comes to real estate, I am motivated by the quality of the experience rather than the quantity of transactions completed. This is why I have so much repeat business and referrals from satisfied clients.
                        </p>
                        <Box height={50}></Box>
                        <Grid2 container spacing={{ xs: 0, md: 3 }}>
                            <Grid2 size={{ xs: 12, md: 6 }}>
                                <p className={`${styles.light_text} ${styles.zero_margin_n_padding}`}>
                                    Direct Contact
                                </p>
                            </Grid2>
                            <Grid2 size={{ xs: 12, md: 6 }}>
                                <a href="mailto:ronbasra@gmail.com" className={`${styles.contact_link} ${styles.zero_margin_n_padding}`}>
                                    ronbasra@gmail.com
                                </a>
                                <a href="tel:+16047309899" className={`${styles.contact_link} ${styles.zero_margin_n_padding}`}>
                                    (604) 730-9899
                                </a>
                            </Grid2>
                        </Grid2>
                        <Grid2 container spacing={{ xs: 0, md: 3 }} mt={15}>
                            <Grid2 size={{ xs: 12, md: 6 }}>
                                <p className={`${styles.light_text} ${styles.zero_margin_n_padding}`}>
                                    Office Address
                                </p>
                            </Grid2>
                            <Grid2 size={{ xs: 12, md: 6 }}>
                                <p className={`${styles.zero_margin_n_padding}`}>
                                    4806 Main St
                                </p>
                                <p className={`${styles.zero_margin_n_padding}`}>
                                    Vancouver, BC V5V 2R8
                                </p>
                            </Grid2>
                        </Grid2>
                    </Grid2>

                    <Grid2 size={{ xs: 12, md: 6 }}>
                        <h3 className="heading_3r">Get in Touch</h3>
                        <form onSubmit={handleSubmit}>
                            <Stack spacing={3}>
                                <TextField
                                    fullWidth
                                    label="Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    variant="outlined"
                                />
                                <TextField
                                    fullWidth
                                    label="Email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    variant="outlined"
                                />
                                <TextField
                                    fullWidth
                                    label="Phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    variant="outlined"
                                />
                                <TextField
                                    fullWidth
                                    label="Message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    multiline
                                    rows={4}
                                    variant="outlined"
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{
                                        backgroundColor: "black",
                                        color: "white",
                                        "&:hover": {
                                            backgroundColor: "#333",
                                        },
                                    }}
                                >
                                    Send Message
                                </Button>
                            </Stack>
                        </form>
                    </Grid2>
                </Grid2>
            </Container>
        </>
    );
}
