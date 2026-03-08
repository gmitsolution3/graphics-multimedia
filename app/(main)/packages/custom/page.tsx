"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import Link from "next/link";
import { useGetServices } from "@/hooks/swr/useGetServices";
import { CustomServiceLoader } from "@/components/loaders/CustomServiceLoader";
import CustomPackageBookingForm from "@/components/forms/CustomBookingForm";
import CustomPackageSummary from "@/components/CustomPackageSummery";
import { IService } from "@/types";
import { usePost } from "@/hooks/swr/usePost";
import Swal from "sweetalert2";
import { notify } from "@/utils/toast";
import { useRouter } from "next/navigation";

export default function CustomPackagePage() {
  const [selectedServices, setSelectedServices] = useState<string[]>(
    [],
  );
  const { data, isLoading } = useGetServices();
  const services = data?.data || [];

  const { createItem, isCreating } = usePost("/bookings");

  const router = useRouter();

  const toggleService = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId],
    );
  };

  const handleFormSubmit = async (formData: any) => {
    const selectedServicesDetails = selectedServices.map((id) => {
      const service = services.find((s: IService) => s._id === id);
      return {
        name: service?.name || "",
        price: service?.price || 0,
        included: true,
      };
    });

    const totalPrice = selectedServices.reduce((sum, id) => {
      const service = services.find((s: IService) => s._id === id);
      return sum + (service?.price || 0);
    }, 0);

    const customPackageData = {
      name: `${formData.name}'s Custom Package`,
      description: `A Custom made package for ${formData.name}`,
      price: totalPrice,
      period:
        formData.timeline === "1month"
          ? "Monthly"
          : formData.timeline === "3months"
            ? "Quarterly"
            : formData.timeline === "6months"
              ? "Bi-annual"
              : "Annual",
      services: selectedServicesDetails,
    };

    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      projectDetails: formData.projectDetails,
      selectedPackage: customPackageData,
      packageModel: "CustomPackage",
      bookingType: "custom",
    };

    try {
      const res = await createItem(payload);

      if (res.success) {
        Swal.fire({
          title: "Awesome",
          text: res.message,
          icon: "success",
        });

        router.push("/");
      }
    } catch (error: any) {
      notify.error(error.message);
    }
  };

  const totalPrice = selectedServices.reduce((sum, id) => {
    const service = services.find((s: IService) => s._id === id);
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
            {/* Left Column - Form */}
            <div>
              <div className="sticky top-24">
                <CustomPackageBookingForm
                  isLoading={isCreating}
                  selectedServicesCount={selectedServices.length}
                  onSubmit={handleFormSubmit}
                />
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
                  {!isLoading && (
                    <span className="text-xs opacity-40">
                      {selectedServices.length} selected
                    </span>
                  )}
                </div>

                <div className="space-y-8 max-h-[600px] overflow-y-auto pr-4 custom-scrollbar">
                  {isLoading ? (
                    <>
                      {Array.from({ length: 6 }).map((_, index) => (
                        <CustomServiceLoader key={index} />
                      ))}
                    </>
                  ) : (
                    services.map((service: IService) => {
                      const isSelected = selectedServices.includes(
                        service._id,
                      );
                      return (
                        <div
                          key={service._id}
                          onClick={() => toggleService(service._id)}
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
                    })
                  )}
                </div>

                {/* Selected Services Summary */}
                {!isLoading && (
                  <CustomPackageSummary
                    selectedServices={selectedServices}
                    services={services}
                    totalPrice={totalPrice}
                    onRemoveService={toggleService}
                  />
                )}

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
