"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";

const pricingPlans = [
  {
    name: "Starter",
    description:
      "Essential digital services to establish your online presence.",
    price: "$2,499",
    period: "per month",
    services: [
      { name: "SEO Optimization", included: true },
      { name: "Social Media Marketing", included: true },
      { name: "Content Strategy", included: true },
      { name: "Email Marketing", included: false },
      { name: "PPC Advertising", included: false },
      { name: "Web Development", included: false },
    ],
    cta: "Start with Starter",
    popular: false,
  },
  {
    name: "Growth",
    description:
      "Comprehensive services for expanding your market reach.",
    price: "$4,999",
    period: "per month",
    services: [
      { name: "SEO Optimization", included: true },
      { name: "Social Media Marketing", included: true },
      { name: "Content Strategy", included: true },
      { name: "Email Marketing", included: true },
      { name: "PPC Advertising", included: true },
      { name: "Web Development", included: false },
    ],
    cta: "Accelerate with Growth",
    popular: true,
  },
  {
    name: "Enterprise",
    description: "Full-service solution for maximum digital impact.",
    price: "$8,999",
    period: "per month",
    services: [
      { name: "SEO Optimization", included: true },
      { name: "Social Media Marketing", included: true },
      { name: "Content Strategy", included: true },
      { name: "Email Marketing", included: true },
      { name: "PPC Advertising", included: true },
      { name: "Web Development", included: true },
    ],
    cta: "Scale with Enterprise",
    popular: false,
  },
];

export default function RegularPackagePage() {
  return (
    <section id="pricing" className="py-20 lg:py-28 bg-card">
      <div className="container mx-auto px-4">
        {/* Minimal Section Header */}
        <div className="max-w-3xl mx-auto mb-16 lg:mb-20 text-center">
          <div className="inline-block">
            <div className="w-12 h-0.5 bg-primary mx-auto mb-6"></div>
          </div>
          <h2 className="text-3xl lg:text-4xl font-light tracking-tight mb-5">
            Service-based packages
          </h2>
          <p className="text-base lg:text-lg max-w-2xl mx-auto leading-relaxed opacity-60">
            Choose the combination of services that fits your business
            goals.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`bg-card p-8 lg:p-10 relative group ${
                plan.popular ? "bg-card" : ""
              }`}
            >
              {/* Popular tag */}
              {plan.popular && (
                <div className="absolute top-0 right-0">
                  <div className="relative overflow-hidden w-20 h-20">
                    <div className="absolute top-4 right-4 w-12 h-px bg-primary/60 rotate-45 origin-top-right"></div>
                    <span className="absolute top-8 right-4 text-[8px] tracking-[0.2em] uppercase text-primary/60 rotate-45 origin-top-right">
                      Popular
                    </span>
                  </div>
                </div>
              )}

              {/* Plan header */}
              <div className="mb-8">
                <h3 className="text-sm tracking-[0.2em] uppercase opacity-40 mb-3">
                  {plan.name}
                </h3>
                <p className="text-xs opacity-60 leading-relaxed mb-6">
                  {plan.description}
                </p>
                <div className="flex items-end gap-1">
                  <span className="text-3xl font-light">
                    {plan.price}
                  </span>
                  <span className="text-xs opacity-40 mb-1">
                    {plan.period}
                  </span>
                </div>
              </div>

              {/* Services list */}
              <div className="space-y-4 mb-8">
                {plan.services.map((service, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center gap-3 text-sm ${
                      service.included ? "opacity-80" : "opacity-30"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 flex items-center justify-center`}
                    >
                      <Check
                        className={`w-3 h-3 ${service.included ? "text-primary" : ""}`}
                      />
                    </div>
                    <span>{service.name}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button - Minimal styling */}
              <Button
                asChild
                className={`relative overflow-hidden group/btn w-full bg-transparent border hover:text-white ${
                  plan.popular
                    ? "border-primary/30 hover:border-primary/60"
                    : "border-border/60 hover:border-primary/30"
                } text-foreground uppercase text-xs tracking-[0.2em] px-6 py-5 rounded-none transition-all duration-500`}
              >
                <Link
                  href={`/book-service/${plan.name.toLowerCase()}`}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {plan.cta}
                    <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                  </span>
                  <div
                    className={`absolute inset-0 ${
                      plan.popular ? "bg-primary/5" : "bg-transparent"
                    } -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500`}
                  ></div>
                </Link>
              </Button>

              {/* Subtle accent line */}
              <div className="w-8 h-px bg-primary/30 mt-6 group-hover:w-12 transition-all duration-300"></div>
            </div>
          ))}
        </div>

        {/* Custom package note */}
        <div className="text-center mt-16 max-w-2xl mx-auto">
          <div className="border-t border-border/40 pt-10">
            <p className="text-sm opacity-60 mb-6">
              Need a custom combination of services?
            </p>
            <Button
              asChild
              variant="outline"
              className="border-border/60 hover:border-primary/30 text-foreground/80 hover:text-foreground uppercase text-xs tracking-[0.2em] px-8 py-5 rounded-none bg-transparent transition-all duration-300"
            >
              <Link href="/packages/custom">
                Build custom package
              </Link>
            </Button>
          </div>
        </div>

        {/* Bottom accent */}
        <div className="text-center mt-16">
          <span className="text-xs tracking-[0.3em] uppercase opacity-40">
            Flexible solutions for every business
          </span>
        </div>
      </div>

      {/* Corner accents */}
      <div className="absolute bottom-0 left-0 w-12 h-12 border-l border-b border-primary/5 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-12 h-12 border-r border-b border-primary/5 pointer-events-none"></div>
    </section>
  );
}
