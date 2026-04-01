"use client";

import { useEffect, useRef, useState } from "react";

interface CounterProps {
  end: number;
  suffix?: string;
  label: string;
}

export default function AboutCounter({ end, suffix = "", label }: CounterProps) {
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