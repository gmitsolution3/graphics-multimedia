"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import WebDevelopment from "@/assets/web-development.jpeg";
import DigitalMarketing from "@/assets/digital-marketing.jpeg";
import GraphicsDesign from "@/assets/graphics-design.jpeg";

import "swiper/css";
import "swiper/css/effect-fade";

const slides = [
  {
    tag: "Digital Marketing",
    headline: "We Build Digital Experiences",
    highlight: "Digital Experiences",
    body: "Transform your brand with data-driven strategies. We help businesses grow through innovative solutions and measurable results.",
    cta: "Start Your Project",
    ctaSecondary: "View Our Work",
    image: DigitalMarketing,
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
    image: GraphicsDesign,
    imageAlt: "Graphics design",
    stats: [
      { value: "180+", label: "Brands" },
      { value: "3×", label: "Revenue Growth" },
      { value: "40+", label: "Industries" },
    ],
  },
  {
    tag: "Web Development",
    headline: "We Engineer Seamless Platforms",
    highlight: "Seamless Platforms",
    body: "High-performance websites and apps that convert visitors into customers, built with modern tech stacks.",
    cta: "Start Building",
    ctaSecondary: "View Portfolio",
    image: WebDevelopment,
    imageAlt: "Web development",
    stats: [
      { value: "99.9%", label: "Uptime" },
      { value: "2s", label: "Load Time" },
      { value: "500+", label: "Sites Delivered" },
    ],
  },
];

export default function Hero() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  return (
    <>
      <style>{`
        @keyframes kenBurns {
          0%   { transform: scale(1.07); }
          100% { transform: scale(1.0); }
        }
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

        .kb         { animation: kenBurns   7s cubic-bezier(0.25,0.46,0.45,0.94) both; }
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
          speed={1000}
          allowTouchMove={false}
          onSwiper={(s) => (swiperRef.current = s)}
          onSlideChange={(s) => {
            setActiveIndex(s.realIndex);
            setAnimKey((k) => k + 1);
          }}
          className="absolute inset-0 w-full h-full"
        >
          {slides.map((sl, idx) => (
            <SwiperSlide key={idx} className="w-full h-full">
              <div
                key={`kb-${animKey}-${idx}`}
                className="kb absolute inset-0"
              >
                <Image
                  src={sl.image}
                  alt={sl.imageAlt}
                  fill
                  className="object-cover object-center"
                  priority={idx === 0}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Dark overlay - more subtle gradient */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.45) 40%, rgba(0,0,0,0.1) 70%, rgba(0,0,0,0) 100%)",
          }}
        />
        {/* Bottom vignette - more subtle */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40 z-10"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 100%)",
          }}
        />

        {/* Left text content */}
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="container mx-auto px-6 lg:px-16">
            <div className="max-w-xl" key={animKey}>
              {/* Tag - minimal style with primary color */}

              <div className="a-tag mb-5">
                <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-white/70 border border-white/20 bg-white/5 backdrop-blur-sm rounded-full px-4 py-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/70" />
                  {slides[activeIndex].tag}
                </span>
              </div>

              {/* Headline - light font weight */}
              <h1 className="a-head text-5xl lg:text-6xl font-light text-white leading-[1.1] tracking-tight mb-5">
                {slides[activeIndex].headline
                  .split(slides[activeIndex].highlight)
                  .map((part, i, arr) => (
                    <span key={i}>
                      {part}
                      {i < arr.length - 1 && (
                        <span className="text-primary/90 font-normal">
                          {slides[activeIndex].highlight}
                        </span>
                      )}
                    </span>
                  ))}
              </h1>

              {/* Body - subtle opacity */}
              <p className="a-body text-white/60 text-base leading-relaxed mb-10 max-w-sm">
                {slides[activeIndex].body}
              </p>

              {/* CTAs - minimal button styling */}
              <div className="a-cta flex flex-col sm:flex-row gap-3">
                <Button className="py-6 w-50 uppercase">
                  {slides[activeIndex].cta}
                  <ArrowRight className="ml-0 w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  className="py-6 w-50 uppercase border-white/60 bg-transparent text-white"
                >
                  {slides[activeIndex].ctaSecondary}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="absolute bottom-16 left-0 right-0 z-20">
          <div className="container mx-auto px-6 lg:px-16">
            <div className="flex items-end justify-between gap-4">
              {/* Stats - minimal styling */}
              <div
                key={`stats-${animKey}`}
                className="a-stats flex gap-10"
              >
                {slides[activeIndex].stats.map((stat) => (
                  <div key={stat.label} className="group">
                    <p className="text-white text-2xl font-light leading-none">
                      {stat.value}
                    </p>
                    <p className="text-white/40 text-[10px] tracking-[0.2em] uppercase mt-2 group-hover:text-white/60 transition-colors">
                      {stat.label}
                    </p>
                    {/* Subtle accent line */}
                    <div className="w-6 h-px bg-primary/30 mt-2 group-hover:w-8 transition-all duration-300"></div>
                  </div>
                ))}
              </div>

              {/* Controls - refined */}
              <div className="flex flex-col items-end gap-4">
                {/* Prev / Next + counter */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => swiperRef.current?.slidePrev()}
                    aria-label="Previous slide"
                    className="w-9 h-9 rounded-full border border-white/30 bg-black/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/25 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  {/* Slide dots */}
                  <div className="flex items-center gap-2">
                    {slides.map((_, i) => (
                      <button
                        key={i}
                        onClick={() =>
                          swiperRef.current?.slideToLoop(i)
                        }
                        aria-label={`Slide ${i + 1}`}
                        className="relative h-0.5 rounded-full overflow-hidden transition-all duration-300 bg-white/25"
                        style={{
                          width: i === activeIndex ? "36px" : "12px",
                        }}
                      >
                        {i === activeIndex && (
                          <span
                            key={animKey}
                            className="a-ticker absolute inset-y-0 left-0 bg-white rounded-full"
                          />
                        )}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => swiperRef.current?.slideNext()}
                    aria-label="Next slide"
                    className="w-9 h-9 rounded-full border border-white/30 bg-black/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/25 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Slide counter */}
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
        <div className="absolute top-12 left-12 w-12 h-12 border-l border-t border-white/10 z-20"></div>
        <div className="absolute bottom-12 right-12 w-12 h-12 border-r border-b border-white/10 z-20"></div>
      </section>
    </>
  );
}
