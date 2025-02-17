"use client";

import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css"; // Import Swiper styles
import { NavigationOptions } from "swiper/types";
import { Grid2, useMediaQuery } from "@mui/material";
import FeaturedListingSlide from "./FeaturedListingSlide";
import "./lisitngButton.css";
import { redirect, RedirectType } from "next/navigation";
import listingsData from './listings.json';

interface Listing {
    id: string;
    title: string;
    description: string;
    mainSummary: {
        status: string;
        propertyType: string;
        MLS: string;
        bedrooms: number;
        bathrooms: number;
    };
    coordinates: {
        lat: number;
        lng: number;
    };
    photos: Array<{
        id: string;
        downloadUrl: string;
        savedPath: string;
    }>;
}

export default function FeaturedSwiper({ isMobile }: { isMobile: boolean }) {
    const prevButtonRef = useRef(null);
    const nextButtonRef = useRef(null);
    const { listings } = listingsData;

    return (
        <div>
            <Grid2
                container
                mb={3}
                sx={{ display: { xs: "none", md: "flex" } }}
            >
                <Grid2 size={{ xs: 12, md: 9 }}></Grid2>
                <Grid2
                    size={{ xs: 12, md: 3 }}
                    sx={{ textAlign: isMobile ? "center" : "end" }}
                >
                    <button ref={prevButtonRef} className="buttonStyle">
                        <span className="arrow">‹</span>
                    </button>
                    <button ref={nextButtonRef} className="buttonStyle">
                        <span className="arrow">›</span>
                    </button>
                </Grid2>
            </Grid2>
            <Swiper
                modules={[Navigation]}
                navigation={{
                    prevEl: prevButtonRef.current,
                    nextEl: nextButtonRef.current,
                }}
                onInit={(swiper) => {
                    (swiper.params.navigation as NavigationOptions).prevEl =
                        prevButtonRef.current;
                    (swiper.params.navigation as NavigationOptions).nextEl =
                        nextButtonRef.current;
                    swiper.navigation.init();
                    swiper.navigation.update();
                }}
                slidesPerView={isMobile ? 1.3 : 4}
                spaceBetween={isMobile ? 10 : 20}
                loop={true}
            >
                {listings.map((listing: Listing) => (
                    <SwiperSlide
                        key={listing.id}
                        onClick={() => redirect(`/properties/${listing.id}`, RedirectType.push)}
                        style={{cursor: "pointer"}}
                    >
                        <FeaturedListingSlide
                            status={listing.mainSummary.status}
                            propertyType={listing.mainSummary.propertyType}
                            title={listing.title}
                            mls={listing.mainSummary.MLS}
                            bedrooms={listing.mainSummary.bedrooms}
                            bathrooms={listing.mainSummary.bathrooms}
                            background={listing.photos[0].downloadUrl}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
