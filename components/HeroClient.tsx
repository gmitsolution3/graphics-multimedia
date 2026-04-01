"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/effect-fade";
import Link from "next/link";

const slides = [
  {
    tag: "Digital Marketing",
    headline: "We Build Digital Experiences",
    highlight: "Digital Experiences",
    body: "Transform your brand with data-driven strategies. We help businesses grow through innovative solutions and measurable results.",
    cta: "Start Project",
    ctaSecondary: "View Our Work",
    image: "/images/marketing.jpg",
    imageAlt: "Digital marketing",
    stats: [
      { value: "250+", label: "Projects" },
      { value: "98%", label: "Satisfaction" },
      { value: "12+", label: "Years" },
    ],
  },
  {
    tag: "Graphics Design",
    headline: "We Craft Bold Brand Stories",
    highlight: "Bold Brand Stories",
    body: "From identity to campaign, we build brands that resonate and create lasting impressions across every touchpoint.",
    cta: "Build Your Brand",
    ctaSecondary: "See Case Studies",
    image: "/images/graphics_design.jpg",
    imageAlt: "Graphics design",
    stats: [
      { value: "180+", label: "Brands" },
      { value: "3×", label: "Revenue Growth" },
      { value: "40+", label: "Industries" },
    ],
  },
  {
    tag: "Video Editing",
    headline: "We Craft Stories That Captivate",
    highlight: "Stories That Captivate",
    body: "Professional video editing that transforms raw footage into engaging visuals, delivering cinematic quality that grabs attention and drives results.",
    cta: "Edit My Video",
    ctaSecondary: "Watch Showreel",
    image: "/images/video_editing.jpg",
    imageAlt: "Video editing",
    stats: [
      { value: "4K", label: "Ultra HD Quality" },
      { value: "48h", label: "Fast Delivery" },
      { value: "1000+", label: "Videos Produced" },
    ],
  },
];

export default function HeroClient() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes ticker {
          from { width: 0%; }
          to   { width: 100%; }
        }
        @keyframes slideLeft {
          from { opacity: 0; transform: translateX(-16px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        .a-tag      { animation: slideLeft  0.5s 0.05s ease both; }
        .a-head     { animation: fadeSlideUp 0.6s 0.15s cubic-bezier(0.16,1,0.3,1) both; }
        .a-body     { animation: fadeSlideUp 0.6s 0.28s cubic-bezier(0.16,1,0.3,1) both; }
        .a-cta      { animation: fadeSlideUp 0.6s 0.38s cubic-bezier(0.16,1,0.3,1) both; }
        .a-stats    { animation: fadeIn      0.6s 0.50s ease both; }
        .a-ticker   { animation: ticker 6s linear both; }
      `}</style>

      <section
        id="home"
        className="relative h-screen min-h-[640px] max-h-[960px] overflow-hidden"
      >
        {/* Full-bleed background image swiper */}
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          loop
          speed={700}
          allowTouchMove={false}
          onSwiper={(s) => (swiperRef.current = s)}
          onSlideChange={(s) => setActiveIndex(s.realIndex)}
          className="absolute inset-0 w-full h-full"
        >
          {slides.map((sl, idx) => (
            <SwiperSlide key={idx} className="w-full h-full">
              <div className="kb absolute inset-0">
                <Image
                  src={sl.image}
                  alt={sl.imageAlt}
                  fill
                  sizes="100vw"
                  quality={75}
                  priority={idx === 0}
                  className="object-cover object-center"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Dark overlay */}
        <div
          className="absolute inset-0 z-10 
            bg-[linear-gradient(to_bottom,rgba(0,0,0,0.85)_0%,rgba(0,0,0,0.65)_50%,rgba(0,0,0,0.45)_100%)]
            md:bg-[linear-gradient(to_right,rgba(0,0,0,0.85)_0%,rgba(0,0,0,0.45)_40%,rgba(0,0,0,0.1)_70%,rgba(0,0,0,0)_100%)]"
        />

        {/* Bottom vignette */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40 z-10"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 100%)" }}
        />

        {/* Left text content — rendered via .map, only active slide is visible */}
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="container mx-auto px-6 lg:px-16">
            {slides.map((sl, idx) => (
              <div
                key={idx}
                className={`text-center w-full md:text-left md:max-w-xl ${idx === activeIndex ? "block" : "hidden"}`}
              >
                {/* Tag */}
                <div className="a-tag mb-4 md:mb-5 flex justify-center md:justify-start">
                  <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-white/70 border border-white/20 bg-white/5 backdrop-blur-sm rounded-full px-4 py-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/70" />
                    {sl.tag}
                  </span>
                </div>

                {/* Headline */}
                <h1 className="a-head text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white leading-[1.1] tracking-tight mb-4 md:mb-5">
                  {sl.headline.split(sl.highlight).map((part, i, arr) => (
                    <span key={i}>
                      {part}
                      {i < arr.length - 1 && (
                        <span className="text-white font-normal block sm:inline">
                          {sl.highlight}
                        </span>
                      )}
                    </span>
                  ))}
                </h1>

                {/* Body */}
                <p className="a-body text-white/60 text-sm md:text-base leading-relaxed mb-8 md:mb-10 max-w-md mx-auto md:max-w-sm md:mx-0">
                  {sl.body}
                </p>

                {/* CTAs */}
                <div className="a-cta flex flex-col items-center gap-3 sm:flex-row md:items-start">
                  <Button className="py-5 md:py-6 w-full max-w-xs md:w-50 uppercase" asChild>
                    <Link href="/package/regular">
                      {sl.cta}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>

                  <Button
                    variant="outline"
                    className="py-5 md:py-6 w-full max-w-xs md:w-50 uppercase border-white/60 bg-transparent text-white"
                    asChild
                  >
                    <Link href="/#portfolio">{sl.ctaSecondary}</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="absolute bottom-8 md:bottom-16 left-0 right-0 z-20">
          <div className="container mx-auto px-6 lg:px-16">
            <div className="flex flex-col items-center gap-4 md:flex-row md:items-start md:justify-between">

              {/* Stats — map over active slide's stats */}
              {slides.map((sl, idx) =>
                idx === activeIndex ? (
                  <div
                    key={idx}
                    className="a-stats flex justify-center lg:justify-start gap-6 md:gap-10 w-full overflow-x-auto md:overflow-visible pb-2 md:pb-0 scrollbar-hide"
                  >
                    {sl.stats.map((stat) => (
                      <div key={stat.label} className="group flex-shrink-0 text-center md:text-left">
                        <p className="text-white text-xl md:text-2xl font-light leading-none">
                          {stat.value}
                        </p>
                        <p className="text-white/40 text-[8px] md:text-[10px] tracking-[0.2em] uppercase mt-1 md:mt-2 group-hover:text-white/60 transition-colors">
                          {stat.label}
                        </p>
                        <div className="w-4 md:w-6 h-px bg-primary/30 mx-auto md:mx-0 mt-1 md:mt-2 group-hover:w-8 transition-all duration-300" />
                      </div>
                    ))}
                  </div>
                ) : null
              )}

              {/* Controls */}
              <div className="flex flex-col items-center md:items-end gap-4">
                <div className="flex items-center gap-3">
                  {/* Prev */}
                  <button
                    onClick={() => swiperRef.current?.slidePrev()}
                    aria-label="Previous slide"
                    className="w-8 h-8 md:w-9 md:h-9 rounded-full border border-white/30 bg-black/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/25 transition-colors"
                  >
                    <ChevronLeft className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  </button>

                  {/* Pagination dots */}
                  <div className="flex items-center gap-1.5 md:gap-2">
                    {slides.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => swiperRef.current?.slideToLoop(i)}
                        aria-label={`Slide ${i + 1}`}
                        className="relative h-0.5 rounded-full overflow-hidden transition-all duration-300 bg-white/25"
                        style={{ width: i === activeIndex ? "24px" : "8px" }}
                      >
                        {i === activeIndex && (
                          <span className="a-ticker absolute inset-y-0 left-0 bg-white rounded-full" />
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Next */}
                  <button
                    onClick={() => swiperRef.current?.slideNext()}
                    aria-label="Next slide"
                    className="w-8 h-8 md:w-9 md:h-9 rounded-full border border-white/30 bg-black/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/25 transition-colors"
                  >
                    <ChevronRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  </button>
                </div>

                {/* Counter */}
                <p className="text-white/40 text-xs tabular-nums tracking-widest">
                  <span className="text-white font-semibold">
                    {String(activeIndex + 1).padStart(2, "0")}
                  </span>
                  {" / "}
                  {String(slides.length).padStart(2, "0")}
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* Corner accents */}
        <>
          <div className="hidden md:block absolute top-12 left-12 w-12 h-12 border-l border-t border-white/10 z-20" />
          <div className="hidden md:block absolute bottom-12 right-12 w-12 h-12 border-r border-b border-white/10 z-20" />
        </>
      </section>
    </>
  );
}