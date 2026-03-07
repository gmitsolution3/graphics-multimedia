"use client";

import { useState, use } from "react";
import { Button } from "@/components/ui/button";
import {
  Check,
  Mail,
  Phone,
  User,
  Building2,
  FileText,
  Send,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import { useGetById } from "@/hooks/swr/useGetById";
import { IPackageService } from "@/types";
import SelectedPackageLoader from "@/components/loaders/SelectedPackageLoader";

interface IParams {
  params: Promise<{ id: string }>;
}

export default function BookServicePage({ params }: IParams) {
  const { id } = use(params);

  const { data, isLoading, error } = useGetById("/packages", id);

  const selectedPlan = data?.data || {};

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectDetails: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call - replace with actual API
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log({
        ...formData,
        selectedPlan,
      });

      // Success handling (you might want to show a success message or redirect)
      alert("Request submitted successfully!");

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        projectDetails: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Name Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="block text-xs tracking-wide opacity-40 flex items-center gap-2"
                  >
                    <User className="w-3.5 h-3.5" />
                    Your name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    className="w-full bg-transparent border-b border-primary/60 py-3 text-sm opacity-80 focus:opacity-100 focus:border-primary/60 outline-none transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                    placeholder="John Doe"
                  />
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-xs tracking-wide opacity-40 flex items-center gap-2"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    Email address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    className="w-full bg-transparent border-b border-primary/60 py-3 text-sm opacity-80 focus:opacity-100 focus:border-primary/60 outline-none transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                    placeholder="john@example.com"
                  />
                </div>

                {/* Phone Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="phone"
                    className="block text-xs tracking-wide opacity-40 flex items-center gap-2"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    Phone number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className="w-full bg-transparent border-b border-primary/60 py-3 text-sm opacity-80 focus:opacity-100 focus:border-primary/60 outline-none transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                {/* Company Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="company"
                    className="block text-xs tracking-wide opacity-40 flex items-center gap-2"
                  >
                    <Building2 className="w-3.5 h-3.5" />
                    Company name
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className="w-full bg-transparent border-b border-primary/60 py-3 text-sm opacity-80 focus:opacity-100 focus:border-primary/60 outline-none transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                    placeholder="Your Company LLC"
                  />
                </div>

                {/* Project Details */}
                <div className="space-y-2">
                  <label
                    htmlFor="projectDetails"
                    className="block text-xs tracking-wide opacity-40 flex items-center gap-2"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    Project details *
                  </label>
                  <textarea
                    id="projectDetails"
                    name="projectDetails"
                    value={formData.projectDetails}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    disabled={isSubmitting}
                    className="w-full bg-transparent border-b border-primary/60 py-3 text-sm opacity-80 focus:opacity-100 focus:border-primary/60 outline-none resize-none transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                    placeholder="Tell us about your project goals and requirements..."
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    disabled={
                      !selectedPlan ||
                      isLoading ||
                      !!error ||
                      isSubmitting
                    }
                    className="relative overflow-hidden group w-full bg-transparent border border-border/60 hover:border-primary/50 text-foreground uppercase text-xs tracking-[0.2em] px-8 py-6 rounded-none transition-all duration-500 disabled:opacity-30 disabled:cursor-not-allowed hover:text-white"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <>
                          <RefreshCw className="w-3 h-3 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit Request
                          <Send className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-primary/5 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                  </Button>
                </div>

                <p className="text-xs opacity-30 text-center">
                  *Required fields
                </p>
              </form>
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

                        {/* selectedPlan header */}
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
                                <div
                                  className={`w-4 h-4 flex items-center justify-center`}
                                >
                                  <Check
                                    className={`w-3 h-3 ${service.included ? "text-primary" : ""}`}
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
