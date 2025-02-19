"use client";

import { Box } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import "./ImageGallery.css";

interface Photo {
  id: string;
  downloadUrl: string;
  savedPath: string;
  listingId: string;
}

interface ImageGalleryProps {
  photos: Photo[];
}

export default function ImageGallery({ photos }: ImageGalleryProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  return (
    <Box sx={{ mt: 4 }}>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        } as React.CSSProperties}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Navigation, FreeMode, Thumbs]}
        className="main-swiper"
      >
        {photos.map((photo) => (
          <SwiperSlide key={photo.id}>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                paddingTop: "56.25%", // 16:9 aspect ratio
              }}
            >
              <Image
                src={photo.downloadUrl}
                alt={`Property photo ${photo.id}`}
                fill
                style={{ objectFit: "cover" }}
                priority={true}
              />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView="auto"
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="thumbs-swiper"
      >
        {photos.map((photo) => (
          <SwiperSlide key={photo.id}>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                paddingTop: "56.25%", // 16:9 aspect ratio
                cursor: "pointer",
              }}
            >
              <Image
                src={photo.downloadUrl}
                alt={`Property photo thumbnail ${photo.id}`}
                fill
                style={{ objectFit: "cover" }}
              />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
} 