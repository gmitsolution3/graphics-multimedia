"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import ProjectOne from "@/assets/phonex.jpg";
import ProjectTwo from "@/assets/huaway.jpg";
import ProjectThree from "@/assets/skybuy.jpg";
import ProjectFour from "@/assets/gm-it-hospital.jpg";
import ProjectFive from "@/assets/gm-international.jpg";
import ProjectSix from "@/assets/gm-it.jpg";

const categories = ["All", "Branding", "Web Design"];

const projects = [
  {
    title: "Phonex",
    category: "Branding",
    image: ProjectOne,
  },
  {
    title: "Huaway",
    category: "Branding",
    image: ProjectTwo,
  },
  {
    title: "Sky buy",
    category: "Branding",
    image: ProjectThree,
  },
  {
    title: "GM Hospital",
    category: "Web Design",
    image: ProjectFour,
  },
  {
    title: "GM International",
    category: "Web Design",
    image: ProjectFive,
  },
  {
    title: "GM E-commerce",
    category: "Web Design",
    image: ProjectSix,
  },
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter(
          (project) => project.category === activeCategory,
        );

  return (
    <section id="portfolio" className="py-20 lg:py-28 bg-card">
      <div className="container mx-auto px-4">
        {/* Minimal Section Header */}
        <div className="max-w-3xl mx-auto mb-16 lg:mb-20 text-center">
          <div className="inline-block">
            <div className="w-12 h-0.5 bg-primary mx-auto mb-6"></div>
          </div>
          <h2 className="text-3xl lg:text-4xl font-light tracking-tight mb-5">
            Selected work
          </h2>
          <p className="text-base lg:text-lg max-w-2xl mx-auto leading-relaxed opacity-60">
            A curated collection of projects that showcase our
            approach and expertise.
          </p>
        </div>

        {/* Category Filter - Minimal styling */}
        <div className="flex flex-wrap justify-center gap-6 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className="relative group"
            >
              <span
                className={`text-sm tracking-wider transition-colors duration-300 ${
                  activeCategory === category
                    ? "text-primary"
                    : "opacity-40 hover:opacity-60"
                }`}
              >
                {category}
              </span>
              {/* Active indicator line */}
              <span
                className={`absolute -bottom-2 left-0 h-px bg-primary transition-all duration-300 ${
                  activeCategory === category
                    ? "w-full"
                    : "w-0 group-hover:w-1/2"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              className="group relative aspect-[4/4] overflow-hidden bg-muted cursor-pointer"
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Minimal overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden">
                <div className="absolute top-0 right-0 w-12 h-12 bg-primary/80 rotate-45 translate-x-6 -translate-y-6 group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform duration-500"></div>
              </div>

              {/* Content - Minimal reveal */}
              <div className="absolute inset-0 flex items-end p-8">
                <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <span className="text-xs tracking-[0.2em] uppercase text-white/60">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-light text-white mt-2 flex items-center gap-2">
                    {project.title}
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all duration-300" />
                  </h3>
                  {/* Subtle accent line */}
                  <div className="w-8 h-px bg-primary/60 mt-4 group-hover:w-12 transition-all duration-300"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom accent */}
        <div className="text-center mt-16">
          <span className="text-xs tracking-[0.3em] uppercase opacity-40">
            View full portfolio
          </span>
        </div>
      </div>
    </section>
  );
}
