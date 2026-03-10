"use client";

import { useState } from "react";
import Link from "next/link";
import { useGetServices } from "@/hooks/swr/useGetServices";
import CustomPackageBookingForm from "@/components/forms/CustomBookingForm";
import CustomPackageSelection, { SelectedServiceWithQuantity } from "@/components/CustomPackageSelection";
import { IService } from "@/types";
import { usePost } from "@/hooks/swr/usePost";
import Swal from "sweetalert2";
import { notify } from "@/utils/toast";
import { useRouter } from "next/navigation";

export default function CustomPackagePage() {
  const [selectedServices, setSelectedServices] = useState<SelectedServiceWithQuantity[]>([]);
  const { data, isLoading } = useGetServices();
  const services = data?.data || [];

  const { createItem, isCreating } = usePost("/bookings");
  const router = useRouter();

  const toggleService = (serviceId: string) => {
    setSelectedServices((prev) => {
      const existing = prev.find(s => s.serviceId === serviceId);
      
      if (existing) {
        // If service exists, remove it
        return prev.filter(s => s.serviceId !== serviceId);
      } else {
        // If service doesn't exist, add it with quantity 1
        const service = services.find((s: IService) => s._id === serviceId);
        return [...prev, {
          serviceId,
          quantity: 1,
          name: service?.name || "",
          price: service?.price || 0
        }];
      }
    });
  };

  const updateQuantity = (serviceId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      // If quantity becomes 0, remove the service
      setSelectedServices(prev => prev.filter(s => s.serviceId !== serviceId));
    } else {
      setSelectedServices(prev =>
        prev.map(s =>
          s.serviceId === serviceId
            ? { ...s, quantity: newQuantity }
            : s
        )
      );
    }
  };

  const handleFormSubmit = async (formData: any) => {
    // Transform selected services with quantities for the package
    const selectedServicesDetails = selectedServices.map((item) => {
      return {
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        totalPrice: item.price * item.quantity,
        included: true,
      };
    });

    // Calculate total price including quantities
    const totalPrice = selectedServices.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
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
      services: selectedServicesDetails.map(s => ({
        name: s.name,
        price: s.price,
        included: true,
        quantity: s.quantity
      })),
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

  const totalPrice = selectedServices.reduce((sum, item) => {
    return sum + (item.price * item.quantity);
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
            Select the services you need and set quantities for each.
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
              <CustomPackageSelection
                services={services}
                isLoading={isLoading}
                selectedServices={selectedServices}
                onToggleService={toggleService}
                onUpdateQuantity={updateQuantity}
                totalPrice={totalPrice}
              />
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