"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import CeoImage from "@/assets/ceo.jpg";

interface CounterProps {
  end: number;
  suffix?: string;
  label: string;
}

function Counter({ end, suffix = "", label }: CounterProps) {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = end / steps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 },
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, [end]);

  return (
    <div ref={countRef} className="group text-center">
      <p className="text-4xl lg:text-5xl font-light text-primary opacity-90 group-hover:opacity-100 transition-opacity">
        {count}
        {suffix}
      </p>
      <p className="text-xs tracking-wide opacity-50 mt-2 group-hover:opacity-70 transition-opacity">
        {label}
      </p>
      {/* Subtle accent line */}
      <div className="w-6 h-px bg-primary opacity-30 mx-auto mt-3 group-hover:w-8 group-hover:opacity-60 transition-all duration-300"></div>
    </div>
  );
}

const stats = [
  { end: 250, suffix: "+", label: "Projects Delivered" },
  { end: 15, suffix: "+", label: "Team Members" },
  { end: 98, suffix: "%", label: "Success Rate" },
  { end: 12, suffix: "+", label: "Years Experience" },
];

export default function About() {
  return (
    <section id="about" className="py-20 lg:py-28 bg-card">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Image Side */}
          <div className="relative group">
            <div className="aspect-[5/5] relative overflow-hidden bg-muted">
              <Image
                src={CeoImage}
                alt="CEO of Gigital Multimedia"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Minimal overlay on hover */}
              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-3 -right-3 w-24 h-24 border border-primary/10"></div>
            <div className="absolute -top-3 -left-3 w-12 h-12 border border-primary/10"></div>

            {/* Corner accent */}
            <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 rotate-45 translate-x-8 -translate-y-8 group-hover:translate-x-6 group-hover:-translate-y-6 transition-transform duration-500"></div>
            </div>
          </div>

          {/* Content Side */}
          <div className="space-y-8">
            {/* Minimal header */}
            <div>
              <div className="w-12 h-px bg-primary mb-6"></div>
              <span className="text-xs tracking-[0.2em] uppercase opacity-50">
                About the founder
              </span>
            </div>

            <h2 className="text-3xl lg:text-4xl font-light tracking-tight leading-tight">
              Leading the way in
              <span className="block text-primary/90">
                digital innovation
              </span>
            </h2>

            <div className="space-y-6">
              <p className="text-sm leading-relaxed opacity-70">
                Founded in 2012, Nexus Digital has been at the
                forefront of digital marketing innovation. Our team of
                experts combines creativity with data-driven
                strategies to deliver exceptional results for our
                clients.
              </p>

              {/* Quote with minimal styling */}
              <div className="relative pl-6">
                <div className="absolute left-0 top-0 w-px h-full bg-primary/30"></div>
                <p className="text-sm italic opacity-60 leading-relaxed">
                  "We believe that every brand has a unique story to
                  tell. Our mission is to help businesses connect with
                  their audience through innovative digital solutions
                  that drive growth and create lasting impact."
                </p>
              </div>
            </div>

            {/* Founder info with hover effect */}
            <div className="flex items-center gap-5 pt-4 group">
              <div>
                <p className="font-medium tracking-tight group-hover:translate-x-1 transition-transform duration-300">
                  Ashraful Islam
                </p>
                <p className="text-xs opacity-50 mt-1">
                  Founder & CEO
                </p>
                {/* Subtle accent line */}
                <div className="w-8 h-px bg-primary opacity-30 mt-2 group-hover:w-12 transition-all duration-300"></div>
              </div>
            </div>

            {/* Stats Grid with refined styling */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-8">
              {stats.map((stat, index) => (
                <Counter key={index} {...stat} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
