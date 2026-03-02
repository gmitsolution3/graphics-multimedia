"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ClientImg from "@/assets/client.png";

const testimonials = [
  {
    quote:
      "Graphics Multimedia transformed our online presence completely. Their SEO strategies increased our organic traffic by 300% in just 6 months.",
    author: "Jennifer Lee",
    role: "CEO, TechStart Inc.",
    image: ClientImg,
  },
  {
    quote:
      "The team's creativity and attention to detail exceeded our expectations. Our brand has never looked better, and the results speak for themselves.",
    author: "Marcus Johnson",
    role: "Founder, EcoLife",
    image: ClientImg,
  },
  {
    quote:
      "Working with Graphics Multimedia was a game-changer for our business. Their social media campaigns generated 5x ROI within the first quarter.",
    author: "Amanda Chen",
    role: "Marketing Director, FoodHub",
    image: ClientImg,
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) =>
        (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  return (
    <section id="testimonials" className="py-16 md:py-20 lg:py-28 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        {/* Minimal Section Header */}
        <div className="max-w-3xl mx-auto mb-12 md:mb-16 lg:mb-20 text-center">
          <div className="inline-block">
            <div className="w-10 md:w-12 h-0.5 bg-primary mx-auto mb-4 md:mb-6"></div>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-tight mb-3 md:mb-5 px-4">
            Client perspectives
          </h2>
          <p className="text-sm md:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed opacity-60 px-4">
            Real results from real partnerships.
          </p>
        </div>

        {/* Testimonial */}
        <div className="max-w-3xl mx-auto">
          <div className="relative group">
            {/* Quote marks - adjusted for mobile */}
            <div className={`absolute ${isMobile ? '-top-4 -left-2 text-6xl' : '-top-8 -left-8 text-8xl'} font-light opacity-10 select-none`}>
              "
            </div>

            {/* Testimonial content */}
            <div className="text-center px-2 md:px-4">
              <p className={`${isMobile ? 'text-lg' : 'text-xl lg:text-2xl'} font-light leading-relaxed opacity-80 mb-6 md:mb-10 px-2 md:px-0`}>
                {testimonials[currentIndex].quote}
              </p>

              {/* Author section - adjusted for mobile */}
              <div className={`flex items-center ${isMobile ? 'flex-col gap-3' : 'justify-center gap-5'}`}>
                <div className={`${isMobile ? 'w-16 h-16' : 'w-14 h-14'} relative overflow-hidden rounded-full`}>
                  <Image
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].author}
                    width={isMobile ? 64 : 56}
                    height={isMobile ? 64 : 56}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className={`${isMobile ? 'text-center' : 'text-left'}`}>
                  <p className="font-medium tracking-tight text-sm md:text-base">
                    {testimonials[currentIndex].author}
                  </p>
                  <p className="text-xs opacity-50 mt-1 tracking-wide">
                    {testimonials[currentIndex].role}
                  </p>
                  {/* Subtle accent line - centered on mobile */}
                  <div className={`${isMobile ? 'mx-auto' : ''} w-8 h-px bg-primary/30 mt-2`}></div>
                </div>
              </div>
            </div>

            {/* Quote mark - bottom right - adjusted for mobile */}
            <div className={`absolute ${isMobile ? '-bottom-4 -right-2 text-6xl' : '-bottom-8 -right-8 text-8xl'} font-light opacity-10 select-none rotate-180`}>
              "
            </div>
          </div>

          {/* Navigation - Responsive layout with buttons on same line for mobile */}
          <div className="flex items-center justify-between mt-12 md:mt-16 pt-6 md:pt-8 border-t border-border/50">
            {/* Previous Button - always visible */}
            <button
              onClick={prevTestimonial}
              className={`flex items-center justify-center transition-all ${
                isMobile 
                  ? 'w-10 h-10 rounded-full border border-border/30 hover:bg-primary/5' 
                  : 'gap-2 text-sm opacity-40 hover:opacity-70 group'
              }`}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className={`${isMobile ? 'w-5 h-5 opacity-60' : 'w-4 h-4 group-hover:-translate-x-1 transition-transform'}`} />
              {!isMobile && <span className="text-xs tracking-wider uppercase">Previous</span>}
            </button>

            {/* Dots - centered */}
            <div className="flex items-center gap-1">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className="relative h-px overflow-hidden transition-all duration-300 bg-border"
                  style={{
                    width: isMobile 
                      ? (index === currentIndex ? "40px" : "16px")
                      : (index === currentIndex ? "32px" : "12px"),
                  }}
                  aria-label={`Go to testimonial ${index + 1}`}
                >
                  {index === currentIndex && (
                    <span className="absolute inset-y-0 left-0 bg-primary animate-[ticker_6s_linear_both]" />
                  )}
                </button>
              ))}
            </div>

            {/* Next Button - always visible */}
            <button
              onClick={nextTestimonial}
              className={`flex items-center justify-center transition-all ${
                isMobile 
                  ? 'w-10 h-10 rounded-full border border-border/30 hover:bg-primary/5' 
                  : 'gap-2 text-sm opacity-40 hover:opacity-70 group'
              }`}
              aria-label="Next testimonial"
            >
              {!isMobile && <span className="text-xs tracking-wider uppercase">Next</span>}
              <ChevronRight className={`${isMobile ? 'w-5 h-5 opacity-60' : 'w-4 h-4 group-hover:translate-x-1 transition-transform'}`} />
            </button>
          </div>

          {/* Mobile swipe hint - optional */}
          {isMobile && (
            <div className="flex justify-center mt-4">
              <span className="text-[10px] tracking-widest uppercase opacity-30">
                Swipe or tap dots
              </span>
            </div>
          )}
        </div>

        {/* Bottom accent */}
        <div className="text-center mt-12 md:mt-16">
          <span className="text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.3em] uppercase opacity-40">
            Trusted by industry leaders
          </span>
        </div>
      </div>

      <style>{`
        @keyframes ticker {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </section>
  );
}