"use client";

import Link from "next/link";
import { FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { heroSlides } from "./hero.logic";

export function Hero() {
  return (
    <section aria-label="Featured offers" className="group relative">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        navigation={{ prevEl: ".hero-prev", nextEl: ".hero-next" }}
        pagination={{ clickable: true }}
        className="hero-swiper"
      >
        {heroSlides.map((slide) => (
          <SwiperSlide key={slide.eyebrow}>
            <div
              className="relative flex h-[330px] items-center bg-cover bg-center sm:h-[390px] lg:h-[430px]"
              style={{
                backgroundImage: `linear-gradient(100deg,rgba(0,178,83,.94),rgba(0,135,70,.62)),url(${slide.image})`,
              }}
            >
              <div className="mx-auto w-full max-w-7xl px-7 text-white sm:px-12">
                <p className="mb-3 text-xs font-bold tracking-[.2em] text-green-50">
                  {slide.eyebrow}
                </p>
                <h1 className="max-w-xl whitespace-pre-line text-3xl leading-tight font-extrabold sm:text-4xl lg:text-5xl">
                  {slide.title}
                </h1>
                <p className="mt-4 text-sm sm:text-base">{slide.detail}</p>
                <Link
                  href="/shop"
                  className="mt-6 inline-flex items-center gap-3 rounded-lg bg-white px-6 py-3 font-bold text-green-700 shadow-lg"
                >
                  {slide.action}
                  <FaArrowRight />
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <button
        aria-label="Previous slide"
        className="hero-prev absolute top-1/2 left-4 z-10 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-white text-green-700 shadow transition hover:bg-green-50"
      >
        <FaChevronLeft />
      </button>
      <button
        aria-label="Next slide"
        className="hero-next absolute top-1/2 right-4 z-10 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-white text-green-700 shadow transition hover:bg-green-50"
      >
        <FaChevronRight />
      </button>
    </section>
  );
}
