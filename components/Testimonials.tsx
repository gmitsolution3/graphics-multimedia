"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

const testimonials = [
  {
    quote: "Nexus Digital transformed our online presence completely. Their SEO strategies increased our organic traffic by 300% in just 6 months.",
    author: "Jennifer Lee",
    role: "CEO, TechStart Inc.",
    image: "/testimonials/client1.jpg",
  },
  {
    quote: "The team's creativity and attention to detail exceeded our expectations. Our brand has never looked better, and the results speak for themselves.",
    author: "Marcus Johnson",
    role: "Founder, EcoLife",
    image: "/testimonials/client2.jpg",
  },
  {
    quote: "Working with Nexus Digital was a game-changer for our business. Their social media campaigns generated 5x ROI within the first quarter.",
    author: "Amanda Chen",
    role: "Marketing Director, FoodHub",
    image: "/testimonials/client3.jpg",
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-card">
      <div className="container mx-auto px-4">
        {/* Minimal Section Header */}
        <div className="max-w-3xl mx-auto mb-16 lg:mb-20 text-center">
          <div className="inline-block">
            <div className="w-12 h-0.5 bg-primary mx-auto mb-6"></div>
          </div>
          <h2 className="text-3xl lg:text-4xl font-light tracking-tight mb-5">
            Client perspectives
          </h2>
          <p className="text-base lg:text-lg max-w-2xl mx-auto leading-relaxed opacity-60">
            Real results from real partnerships.
          </p>
        </div>

        {/* Testimonial */}
        <div className="max-w-3xl mx-auto">
          <div className="relative group">
            {/* Quote mark - minimal */}
            <div className="absolute -top-8 -left-8 text-8xl font-light opacity-10 select-none">
              "
            </div>
            
            {/* Testimonial content */}
            <div className="text-center px-4">
              <p className="text-xl lg:text-2xl font-light leading-relaxed opacity-80 mb-10">
                {testimonials[currentIndex].quote}
              </p>
              
              <div className="flex items-center justify-center gap-5">
                <div className="w-14 h-14 relative overflow-hidden rounded-full">
                  <Image
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].author}
                    width={56}
                    height={56}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="text-left">
                  <p className="font-medium tracking-tight">
                    {testimonials[currentIndex].author}
                  </p>
                  <p className="text-xs opacity-50 mt-1 tracking-wide">
                    {testimonials[currentIndex].role}
                  </p>
                  {/* Subtle accent line */}
                  <div className="w-8 h-px bg-primary/30 mt-2"></div>
                </div>
              </div>
            </div>

            {/* Quote mark - bottom right */}
            <div className="absolute -bottom-8 -right-8 text-8xl font-light opacity-10 select-none rotate-180">
              "
            </div>
          </div>

          {/* Navigation - Minimal styling */}
          <div className="flex items-center justify-between mt-16 pt-8 border-t border-border/50">
            {/* Previous */}
            <button
              onClick={prevTestimonial}
              className="flex items-center gap-2 text-sm opacity-40 hover:opacity-70 transition-opacity group"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-xs tracking-wider uppercase">Previous</span>
            </button>
            
            {/* Dots - Minimal lines instead of circles */}
            <div className="flex items-center gap-1">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className="relative h-px overflow-hidden transition-all duration-300 bg-border"
                  style={{
                    width: index === currentIndex ? "32px" : "12px",
                  }}
                  aria-label={`Go to testimonial ${index + 1}`}
                >
                  {index === currentIndex && (
                    <span className="absolute inset-y-0 left-0 bg-primary animate-[ticker_6s_linear_both]" />
                  )}
                </button>
              ))}
            </div>
            
            {/* Next */}
            <button
              onClick={nextTestimonial}
              className="flex items-center gap-2 text-sm opacity-40 hover:opacity-70 transition-opacity group"
              aria-label="Next testimonial"
            >
              <span className="text-xs tracking-wider uppercase">Next</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Bottom accent */}
        <div className="text-center mt-16">
          <span className="text-xs tracking-[0.3em] uppercase opacity-40">
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
  )
}