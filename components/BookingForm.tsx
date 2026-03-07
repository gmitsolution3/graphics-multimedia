"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Check,
  Mail,
  Phone,
  User,
  Building2,
  FileText,
  Send,
  RefreshCw,
} from "lucide-react";

import { Button } from "./ui/button";

export const bookingFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(1, "Phone number is required"),
  company: z.string().min(1, "Company name is required"),
  projectDetails: z
    .string()
    .min(10, "Project details must be at least 10 characters"),
});

export type BookingFormValues = z.infer<typeof bookingFormSchema>;

interface BookingFormProps {
  selectedPlan: any;
  isSubmitting: boolean;
  setIsSubmitting: (value: boolean) => void;
  onSubmit: (data: BookingFormValues) => Promise<void>;
}

export default function BookingForm({
  selectedPlan,
  isSubmitting,
  setIsSubmitting,
  onSubmit,
}: BookingFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      projectDetails: "",
    },
  });

  const onFormSubmit = async (data: BookingFormValues) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-8">
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
          disabled={isSubmitting}
          className="w-full bg-transparent border-b border-primary/60 py-3 text-sm opacity-80 focus:opacity-100 focus:border-primary/60 outline-none transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
          placeholder="John Doe"
          {...register("name")}
        />
        {errors.name && (
          <p className="text-xs text-destructive/70 mt-1">
            {errors.name.message}
          </p>
        )}
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
          disabled={isSubmitting}
          className="w-full bg-transparent border-b border-primary/60 py-3 text-sm opacity-80 focus:opacity-100 focus:border-primary/60 outline-none transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
          placeholder="john@example.com"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-xs text-destructive/70 mt-1">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Phone Field */}
      <div className="space-y-2">
        <label
          htmlFor="phone"
          className="block text-xs tracking-wide opacity-40 flex items-center gap-2"
        >
          <Phone className="w-3.5 h-3.5" />
          Phone number *
        </label>
        <input
          type="tel"
          id="phone"
          disabled={isSubmitting}
          className="w-full bg-transparent border-b border-primary/60 py-3 text-sm opacity-80 focus:opacity-100 focus:border-primary/60 outline-none transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
          placeholder="+1 (555) 123-4567"
          {...register("phone")}
        />
        {errors.phone && (
          <p className="text-xs text-destructive/70 mt-1">
            {errors.phone.message}
          </p>
        )}
      </div>

      {/* Company Field */}
      <div className="space-y-2">
        <label
          htmlFor="company"
          className="block text-xs tracking-wide opacity-40 flex items-center gap-2"
        >
          <Building2 className="w-3.5 h-3.5" />
          Company name *
        </label>
        <input
          type="text"
          id="company"
          disabled={isSubmitting}
          className="w-full bg-transparent border-b border-primary/60 py-3 text-sm opacity-80 focus:opacity-100 focus:border-primary/60 outline-none transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
          placeholder="Your Company LLC"
          {...register("company")}
        />
        {errors.company && (
          <p className="text-xs text-destructive/70 mt-1">
            {errors.company.message}
          </p>
        )}
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
          rows={4}
          disabled={isSubmitting}
          className="w-full bg-transparent border-b border-primary/60 py-3 text-sm opacity-80 focus:opacity-100 focus:border-primary/60 outline-none resize-none transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
          placeholder="Tell us about your project goals and requirements..."
          {...register("projectDetails")}
        />
        {errors.projectDetails && (
          <p className="text-xs text-destructive/70 mt-1">
            {errors.projectDetails.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <>
        <div className="pt-4">
          <Button
            type="submit"
            disabled={!selectedPlan || isSubmitting}
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
      </>

      <p className="text-xs opacity-30 text-center">
        *Required fields
      </p>
    </form>
  );
}
