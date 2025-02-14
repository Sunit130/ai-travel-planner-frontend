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
    <div className="carousel-container w-80 sm:w-96 relative">
      <Swiper
        modules={[Navigation, Pagination]}
        observer={true}
        observeParents={true}
        spaceBetween={20}
        slidesPerView={1}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        pagination={{ clickable: true, el: ".custom-pagination" }}
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
                priority={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
                className="carousel-image object-cover object-center w-full h-full"
              />
            </div>
          </SwiperSlide>
        ))}
        {/* Custom Navigation Buttons */}
        <button className="custom-prev z-10 absolute left-2 top-1/2 transform -translate-y-1/2 bg-green-500 text-white w-10 h-10 flex items-center justify-center rounded-full shadow-md transition hover:bg-green-600">
          ❮
        </button>
        <button className="custom-next z-10  absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-500 text-white w-10 h-10 flex items-center justify-center rounded-full shadow-md transition hover:bg-green-600">
          ❯
        </button>

        {/* Custom Pagination */}
        <div className="custom-pagination z-10 h-4 flex justify-center mt-4 space-x-2"></div>
      </Swiper>

    </div>
  );
}
