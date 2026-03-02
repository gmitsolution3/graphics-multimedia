"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Check,
  ArrowRight,
  Mail,
  Phone,
  User,
  Building2,
  FileText,
  Send,
  Plus,
  Minus,
  X,
} from "lucide-react";
import Link from "next/link";

const availableServices = [
  {
    category: "Marketing Services",
    services: [
      {
        id: "seo",
        name: "SEO Optimization",
        description:
          "Keyword research, on-page SEO, technical audits",
        price: 899,
        popular: true,
      },
      {
        id: "ppc",
        name: "PPC Advertising",
        description: "Google Ads, campaign management, A/B testing",
        price: 1299,
        popular: true,
      },
      {
        id: "social",
        name: "Social Media Marketing",
        description:
          "Content creation, community management, analytics",
        price: 999,
        popular: false,
      },
      {
        id: "content",
        name: "Content Strategy",
        description: "Blog posts, whitepapers, content calendar",
        price: 749,
        popular: false,
      },
      {
        id: "email",
        name: "Email Marketing",
        description: "Newsletter design, automation, list management",
        price: 599,
        popular: false,
      },
    ],
  },
  {
    category: "Development Services",
    services: [
      {
        id: "webdev",
        name: "Web Development",
        description: "Custom websites, e-commerce, CMS integration",
        price: 2499,
        popular: true,
      },
      {
        id: "webdesign",
        name: "Web Design",
        description: "UI/UX design, wireframing, prototyping",
        price: 1899,
        popular: false,
      },
      {
        id: "mobile",
        name: "Mobile App Development",
        description: "iOS & Android apps, cross-platform solutions",
        price: 3999,
        popular: false,
      },
    ],
  },
  {
    category: "Branding & Creative",
    services: [
      {
        id: "branding",
        name: "Brand Strategy",
        description: "Brand identity, messaging, positioning",
        price: 1499,
        popular: true,
      },
      {
        id: "graphic",
        name: "Graphic Design",
        description: "Logo design, marketing materials, brand assets",
        price: 899,
        popular: false,
      },
      {
        id: "video",
        name: "Video Production",
        description: "Explainer videos, commercials, social content",
        price: 2199,
        popular: false,
      },
    ],
  },
];

const allServices = availableServices.flatMap((cat) => cat.services);

export default function CustomPackagePage() {
  const [selectedServices, setSelectedServices] = useState<string[]>(
    [],
  );
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectDetails: "",
    timeline: "",
  });

  const toggleService = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId],
    );
  };

  const selectAllInCategory = (
    categoryServices: typeof allServices,
  ) => {
    const categoryIds = categoryServices.map((s) => s.id);
    const allSelected = categoryIds.every((id) =>
      selectedServices.includes(id),
    );

    if (allSelected) {
      // Deselect all in category
      setSelectedServices((prev) =>
        prev.filter((id) => !categoryIds.includes(id)),
      );
    } else {
      // Select all in category
      setSelectedServices((prev) => [
        ...new Set([...prev, ...categoryIds]),
      ]);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedServicesDetails = selectedServices.map((id) =>
      allServices.find((s) => s.id === id),
    );
    console.log({
      ...formData,
      selectedServices: selectedServicesDetails,
      totalPrice: selectedServices.reduce((sum, id) => {
        const service = allServices.find((s) => s.id === id);
        return sum + (service?.price || 0);
      }, 0),
    });
  };

  const totalPrice = selectedServices.reduce((sum, id) => {
    const service = allServices.find((s) => s.id === id);
    return sum + (service?.price || 0);
  }, 0);

  return (
    <section className="py-20 lg:py-28 bg-card min-h-screen">
      <div className="container mx-auto px-4">
        {/* Minimal Header */}
        <div className="max-w-3xl mx-auto mb-16 lg:mb-20 text-center">
          <div className="inline-block">
            <div className="w-12 h-0.5 bg-primary mx-auto mb-6"></div>
          </div>
          <h2 className="text-3xl lg:text-4xl font-light tracking-tight mb-5">
            Build your custom package
          </h2>
          <p className="text-base lg:text-lg max-w-2xl mx-auto leading-relaxed opacity-60">
            Select the services you need and we'll create a tailored
            solution for your business.
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left Column - Form & Summary */}
            <div>
              <div className="sticky top-24">
                {/* Contact Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h3 className="text-sm tracking-[0.2em] uppercase opacity-40 mb-4">
                    Your information
                  </h3>

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
                      className="w-full bg-transparent border-b border-primary/60 py-3 text-sm opacity-80 focus:opacity-100 focus:border-primary/60 outline-none transition-all duration-300"
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
                      className="w-full bg-transparent border-b border-primary/60 py-3 text-sm opacity-80 focus:opacity-100 focus:border-primary/60 outline-none transition-all duration-300"
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
                      className="w-full bg-transparent border-b border-primary/60 py-3 text-sm opacity-80 focus:opacity-100 focus:border-primary/60 outline-none transition-all duration-300"
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
                      className="w-full bg-transparent border-b border-primary/60 py-3 text-sm opacity-80 focus:opacity-100 focus:border-primary/60 outline-none transition-all duration-300"
                      placeholder="Your Company LLC"
                    />
                  </div>

                  {/* Timeline Field */}
                  <div className="space-y-2">
                    <label
                      htmlFor="timeline"
                      className="block text-xs tracking-wide opacity-40"
                    >
                      Project timeline
                    </label>
                    <select
                      id="timeline"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleInputChange}
                      className="w-full bg-transparent border-b border-primary/60 py-3 text-sm opacity-80 focus:opacity-100 focus:border-primary/60 outline-none transition-all duration-300"
                    >
                      <option value="">Select timeline</option>
                      <option value="1month">Within 1 month</option>
                      <option value="3months">1-3 months</option>
                      <option value="6months">3-6 months</option>
                      <option value="6months+">6+ months</option>
                    </select>
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
                      rows={3}
                      className="w-full bg-transparent border-b border-primary/60 py-3 text-sm opacity-80 focus:opacity-100 focus:border-primary/60 outline-none resize-none transition-all duration-300"
                      placeholder="Tell us about your project goals and requirements..."
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <Button
                      type="submit"
                      disabled={selectedServices.length === 0}
                      className="relative overflow-hidden group w-full bg-transparent border border-border/60 hover:border-primary/50 text-foreground uppercase text-xs tracking-[0.2em] px-8 py-6 rounded-none transition-all duration-500 disabled:opacity-30 disabled:cursor-not-allowed hover:text-white"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        Submit Custom Package Request
                        <Send className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </span>
                      <div className="absolute inset-0 bg-primary/5 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                    </Button>
                  </div>
                </form>

                {/* Note */}
                <p className="text-xs opacity-30 text-center mt-6">
                  *Required fields • We'll respond within 24 hours
                </p>
              </div>
            </div>

            {/* Right Column - Service Selection */}
            <div>
              <div className="sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-sm tracking-[0.2em] uppercase opacity-40">
                    Available services
                  </h3>
                  <span className="text-xs opacity-40">
                    {selectedServices.length} selected
                  </span>
                </div>

                <div className="space-y-8 max-h-[600px] overflow-y-auto pr-4 custom-scrollbar">
                  {availableServices.map((category, catIdx) => {
                    const categoryIds = category.services.map(
                      (s) => s.id,
                    );
                    const allSelected = categoryIds.every((id) =>
                      selectedServices.includes(id),
                    );
                    const someSelected = categoryIds.some((id) =>
                      selectedServices.includes(id),
                    );

                    return (
                      <div key={catIdx} className="space-y-3">
                        {/* Category header with select all */}
                        <div className="flex items-center justify-between border-b border-border/40 pb-2">
                          <h4 className="text-xs tracking-[0.2em] uppercase opacity-40">
                            {category.category}
                          </h4>
                          <button
                            onClick={() =>
                              selectAllInCategory(category.services)
                            }
                            className={`text-[10px] tracking-wider uppercase transition-colors ${
                              someSelected
                                ? "opacity-60 hover:opacity-100"
                                : "opacity-30 hover:opacity-50"
                            }`}
                          >
                            {allSelected
                              ? "Deselect all"
                              : "Select all"}
                          </button>
                        </div>

                        {/* Services in category */}
                        {category.services.map((service) => {
                          const isSelected =
                            selectedServices.includes(service.id);
                          return (
                            <div
                              key={service.id}
                              onClick={() =>
                                toggleService(service.id)
                              }
                              className={`p-4 border transition-all duration-300 cursor-pointer group ${
                                isSelected
                                  ? "border-primary/30 bg-primary/5"
                                  : "border-border/40 hover:border-border/60"
                              }`}
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <div
                                      className={`w-4 h-4 border flex items-center justify-center transition-colors ${
                                        isSelected
                                          ? "border-primary bg-primary/10"
                                          : "border-border"
                                      }`}
                                    >
                                      {isSelected && (
                                        <Check className="w-3 h-3 text-primary" />
                                      )}
                                    </div>
                                    <h5 className="text-sm font-light">
                                      {service.name}
                                    </h5>
                                    {service.popular && (
                                      <span className="text-[8px] tracking-wider uppercase border border-primary/20 px-1.5 py-0.5 text-primary/60">
                                        Popular
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-xs opacity-40 pl-6">
                                    {service.description}
                                  </p>
                                </div>
                                <span className="text-sm font-light ml-4">
                                  ${service.price}
                                </span>
                              </div>

                              {/* Accent line */}
                              <div
                                className={`w-8 h-px mt-3 transition-all duration-300 ${
                                  isSelected
                                    ? "bg-primary/60 w-12"
                                    : "bg-primary/30 group-hover:w-12"
                                }`}
                              ></div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>

                {/* Selected Services Summary */}
                <div className="mt-10 mb-8 p-6 border border-border/40">
                  <h3 className="text-sm tracking-[0.2em] uppercase opacity-40 mb-4">
                    Your custom package
                  </h3>

                  {selectedServices.length > 0 ? (
                    <>
                      <div className="space-y-3 mb-6 max-h-[200px] overflow-y-auto pr-2">
                        {selectedServices.map((id) => {
                          const service = allServices.find(
                            (s) => s.id === id,
                          );
                          return (
                            <div
                              key={id}
                              className="flex items-center justify-between group"
                            >
                              <div className="flex items-center gap-2">
                                <span className="text-xs opacity-60">
                                  {service?.name}
                                </span>
                                <button
                                  onClick={() => toggleService(id)}
                                  className="opacity-0 group-hover:opacity-30 hover:opacity-100 transition-opacity"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </div>
                              <span className="text-sm">
                                ${service?.price}
                              </span>
                            </div>
                          );
                        })}
                      </div>

                      <div className="border-t border-border/40 pt-4">
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-xs opacity-40">
                            Estimated monthly
                          </span>
                          <span className="text-2xl font-light">
                            ${totalPrice}
                          </span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-sm opacity-30">
                        No services selected yet
                      </p>
                      <p className=" opacity-20 mt-2">
                        Select services from the left to build your
                        package
                      </p>
                    </div>
                  )}

                  <div className="w-12 h-px bg-primary/30 mt-4"></div>
                </div>

                {/* Custom scrollbar styles */}
                <style jsx>{`
                  .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                  }
                  .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                  }
                  .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(0, 0, 0, 0.1);
                    border-radius: 0;
                  }
                  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(0, 0, 0, 0.2);
                  }
                `}</style>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom accent */}
        <div className="text-center mt-20">
          <Link
            href="#contact"
            className="text-xs tracking-[0.3em] uppercase opacity-40 hover:opacity-60 transition-opacity"
          >
            Need help choosing? Contact us
          </Link>
        </div>
      </div>

      {/* Corner accents */}
      <div className="absolute bottom-0 left-0 w-12 h-12 border-l border-b border-primary/5 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-12 h-12 border-r border-b border-primary/5 pointer-events-none"></div>
    </section>
  );
}
