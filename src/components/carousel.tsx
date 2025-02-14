"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface CarouselProps {
  images: [string, string][];
}

export default function Carousel({ images }: CarouselProps) {
  return (
    <div className="carousel-container w-96">
      <Swiper
        modules={[Navigation, Pagination]}
        observer={true}
        observeParents={true}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={images.length > 1}
      >
        {images.map((img, index) => (
          <SwiperSlide key={index} className="items-center">
            <div className="relative w-full max-w-[800px] h-[500px] mx-auto flex items-center justify-center overflow-hidden">
              <Image
                src={img[1]}
                alt={img[0]}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
                priority={index === 0} // SEO: Ensure first image is indexed
                loading={index === 0 ? "eager" : "lazy"} // Lazy load others
                className="carousel-image object-cover object-center  w-full h-full"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
