"use client";

import { useState, use } from "react";
import { Check, AlertCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useGetById } from "@/hooks/swr/useGetById";
import { IPackageService } from "@/types";
import SelectedPackageLoader from "@/components/loaders/SelectedPackageLoader";
import BookingForm from "@/components/BookingForm";
import { BookingFormValues } from "@/components/BookingForm";

interface IParams {
  params: Promise<{ id: string }>;
}

export default function BookServicePage({ params }: IParams) {
  const { id } = use(params);
  const { data, isLoading, error } = useGetById("/packages", id);
  const selectedPlan = data?.data || {};
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (formData: BookingFormValues) => {
    // Simulate API call - replace with actual API
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log({
      ...formData,
      selectedPlan,
    });

    // Success handling
    alert("Request submitted successfully!");
  };

  return (
    <section className="py-20 lg:py-28 bg-card min-h-screen relative">
      <div className="container mx-auto px-4">
        {/* Minimal Header */}
        <div className="max-w-3xl mx-auto mb-16 lg:mb-20 text-center">
          <div className="inline-block">
            <div className="w-12 h-0.5 bg-primary mx-auto mb-6"></div>
          </div>
          <h2 className="text-3xl lg:text-4xl font-light tracking-tight mb-5">
            Request a quote
          </h2>
          <p className="text-base lg:text-lg max-w-2xl mx-auto leading-relaxed opacity-60">
            {error
              ? "We're having trouble loading the package details."
              : "Select a package that fits your needs and tell us about your project."}
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left Column - Form */}
            <div>
              <BookingForm
                selectedPlan={selectedPlan}
                isSubmitting={isSubmitting}
                setIsSubmitting={setIsSubmitting}
                onSubmit={handleFormSubmit}
              />
            </div>

            {/* Right Column - Package Details */}
            <div>
              {isLoading ? (
                <SelectedPackageLoader />
              ) : error ? (
                <div className="bg-card/50 border border-destructive/20 p-8 text-center">
                  <AlertCircle className="w-12 h-12 text-destructive/40 mx-auto mb-4" />
                  <p className="text-sm text-destructive/60 mb-4">
                    {error.message}
                  </p>
                </div>
              ) : (
                <div>
                  <div className="sticky top-24">
                    <h3 className="text-sm tracking-[0.2em] uppercase opacity-40 mb-6 text-center">
                      Selected package
                    </h3>

                    <div className="space-y-4 text-center">
                      <div
                        className={`inline-block bg-card p-8 lg:p-10 relative group border-primary/20 border-l border-r ${
                          selectedPlan.popular ? "bg-card" : ""
                        }`}
                      >
                        {/* Popular tag */}
                        {selectedPlan.popular && (
                          <div className="absolute top-0 right-0">
                            <div className="relative overflow-hidden w-20 h-20">
                              <div className="absolute top-4 right-4 w-12 h-px bg-primary/60 rotate-45 origin-top-right"></div>
                              <span className="absolute top-8 right-4 text-[8px] tracking-[0.2em] uppercase text-primary/60 rotate-45 origin-top-right">
                                Popular
                              </span>
                            </div>
                          </div>
                        )}

                        {/* Package header */}
                        <div className="mb-8">
                          <h3 className="text-sm tracking-[0.2em] uppercase opacity-40 mb-3">
                            {selectedPlan.name}
                          </h3>
                          <p className="text-xs opacity-60 leading-relaxed mb-6">
                            {selectedPlan.description}
                          </p>
                          <div className="flex items-end gap-1">
                            <span className="text-3xl font-light">
                              TK {selectedPlan.price}
                            </span>
                            <span className="text-xs opacity-40 mb-1">
                              {selectedPlan.period}
                            </span>
                          </div>
                        </div>

                        {/* Services list */}
                        <div className="space-y-4 mb-8">
                          {selectedPlan?.services?.map(
                            (
                              service: IPackageService,
                              idx: number,
                            ) => (
                              <div
                                key={idx}
                                className={`flex items-center gap-3 text-sm ${
                                  service.included
                                    ? "opacity-80"
                                    : "opacity-30"
                                }`}
                              >
                                <div className="w-4 h-4 flex items-center justify-center">
                                  <Check
                                    className={`w-3 h-3 ${
                                      service.included
                                        ? "text-primary"
                                        : ""
                                    }`}
                                  />
                                </div>
                                <span>{service.name}</span>
                              </div>
                            ),
                          )}
                        </div>

                        {/* Subtle accent line */}
                        <div className="w-8 h-px bg-primary/30 mt-6 group-hover:w-12 transition-all duration-300"></div>
                      </div>
                    </div>

                    {/* Note */}
                    <p className="text-xs text-center opacity-30 mt-6">
                      You'll receive a detailed quote within 24 hours
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom accent */}
        <div className="text-center mt-20">
          <span className="text-xs tracking-[0.3em] uppercase opacity-40">
            Custom packages available upon request
          </span>
        </div>

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
      </div>

      {/* Corner accents */}
      <div className="absolute bottom-0 left-0 w-12 h-12 border-l border-b border-primary/5 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-12 h-12 border-r border-b border-primary/5 pointer-events-none"></div>
    </section>
  );
}
