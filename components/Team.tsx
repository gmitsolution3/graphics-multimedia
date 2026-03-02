"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import Biplop from "@/assets/biplop.jpg";
import Esha from "@/assets/esha.jpg";
import Habib from "@/assets/habib.jpg";
import Mariam from "@/assets/mariam.jpg";
import Oli from "@/assets/oli.jpg";
import Sobuj from "@/assets/sobuj.jpg";
import Ceo from "@/assets/ceo.jpg";

import Moriom from "@/assets/mariam.jpg";
import Anik from "@/assets/anik.jpeg";
import Sabbir from "@/assets/sabbir.jpeg";
import Siam from "@/assets/siam.jpeg";
import Moin from "@/assets/moin.jpg";
import Musfiqur from "@/assets/musfiqur.jpeg";
import Kawsar from "@/assets/kawsar.png";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const team = [
  {
    name: "Ashraful Islam",
    role: "Founder & CEO",
    image: Ceo,
    linkedin: "https://linkedin.com/in/undefined",
  },

  {
    name: "Morium Akter Jannatul",
    role: "Office Admin",
    image: Mariam,
    linkedin: "https://linkedin.com/in/mariamapu",
  },
  {
    name: "Anik Saha",
    role: "Product Manager",
    image: Anik,
    linkedin: "https://linkedin.com/in/aniksahaaorno",
  },
  {
    name: "Tariqul Islam Khan",
    role: "Full Stack Developer",
    image: Sabbir,
    linkedin: "https://www.linkedin.com/in/tariqul-islam-khan",
  },
  {
    name: "MD. Siam Hossain",
    role: "Graphic Designer",
    image: Siam,
    linkedin: "https://linkedin.com/in/siamvaiboss",
  },
  {
    name: "Moin Khan",
    role: "Frontend Developer",
    image: Moin,
    linkedin: "https://linkedin.com/in/nmkhans",
  },
  {
    name: "Musfiqur Rahman",
    role: "Video Editor",
    image: Musfiqur,
    linkedin: "https://linkedin.com/in/null",
  },
  {
    name: "Kawsar Ahmed",
    role: "Office Assistant",
    image: Kawsar,
    linkedin: "https://linkedin.com/in/null",
  },
];

export default function Team() {
  return (
    <section id="team" className="py-20 lg:py-28 bg-card">
      <div className="container mx-auto px-4">
        {/* Minimal Section Header */}
        <div className="max-w-3xl mx-auto mb-16 lg:mb-20 text-center">
          <div className="inline-block">
            <div className="w-12 h-0.5 bg-primary mx-auto mb-6"></div>
          </div>
          <h2 className="text-3xl lg:text-4xl font-light tracking-tight mb-5">
            The people behind the work
          </h2>
          <p className="text-base lg:text-lg max-w-2xl mx-auto leading-relaxed opacity-60">
            A collective of creators, strategists, and technologists
            dedicated to your success.
          </p>
        </div>

        {/* Swiper Slider */}
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            clickable: true,
            el: ".team-pagination",
            bulletClass:
              "swiper-pagination-bullet !bg-primary/20 !opacity-100",
            bulletActiveClass:
              "swiper-pagination-bullet-active !bg-primary !w-8 !rounded-full",
          }}
          navigation={{
            nextEl: ".team-button-next",
            prevEl: ".team-button-prev",
          }}
          loop={true}
          className="team-slider"
        >
          {team.map((member, index) => (
            <SwiperSlide key={index}>
              <div className="group relative">
                {/* Image Container */}
                <div className="aspect-[4/5] relative overflow-hidden bg-muted">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Minimal overlay on hover */}
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden">
                    <div className="absolute top-0 right-0 w-12 h-12 bg-primary/10 rotate-45 translate-x-6 -translate-y-6 group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform duration-500"></div>
                  </div>

                  {/* Social Links - Minimal hover reveal */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex items-center justify-center gap-4">
                      <a
                        href={member.linkedin}
                        target="_blank"
                        className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-primary transition-colors"
                        aria-label={`${member.name} LinkedIn`}
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="mt-6 text-center">
                  <h3 className="font-medium tracking-tight group-hover:translate-y-[-2px] transition-transform duration-300">
                    {member.name}
                  </h3>
                  <p className="text-xs tracking-wider opacity-50 mt-1.5">
                    {member.role}
                  </p>
                  {/* Subtle accent line */}
                  <div className="w-8 h-px bg-primary opacity-30 mx-auto mt-4 group-hover:w-12 group-hover:opacity-60 transition-all duration-300"></div>
                </div>

                {/* Decorative border elements */}
                <div className="absolute -bottom-2 -right-2 w-16 h-16 border border-primary/5 -z-10"></div>
                <div className="absolute -top-2 -left-2 w-8 h-8 border border-primary/5 -z-10"></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Arrows */}
        <div className="flex items-center justify-center gap-4 mt-12">
          <button className="team-button-prev w-12 h-12 flex items-center justify-center border border-primary/10 hover:border-primary/30 rounded-full transition-all duration-300 group">
            <svg
              className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button className="team-button-next w-12 h-12 flex items-center justify-center border border-primary/10 hover:border-primary/30 rounded-full transition-all duration-300 group">
            <svg
              className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Custom Pagination */}
        <div className="team-pagination flex justify-center gap-2 mt-8"></div>

        {/* Bottom accent */}
        <div className="text-center mt-16">
          <span className="text-xs tracking-[0.3em] uppercase opacity-40">
            Collaborative excellence
          </span>
        </div>
      </div>
    </section>
  );
}
