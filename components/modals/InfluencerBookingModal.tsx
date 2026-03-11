"use client";

import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  X,
  Calendar,
  Mail,
  Phone,
  User,
  Film,
  Clock,
} from "lucide-react";

import { IInfluencer, IInfluencerPricing } from "@/types";

import { usePost } from "@/hooks/swr/usePost";
import { notify } from "./../../utils/toast";

// Define the form schema with Zod - all fields required
const bookingFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 characters"),
  company: z
    .string()
    .min(2, "Company name must be at least 2 characters"),
  projectDetails: z
    .string()
    .min(10, "Project details must be at least 10 characters"),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  influencer: IInfluencer;
}

export default function InfluencerBookingModal({
  isOpen,
  onClose,
  influencer,
}: IProps) {
  const [selectedDuration, setSelectedDuration] = useState(
    influencer.pricing[0].duration,
  );

  // Initialize React Hook Form
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      projectDetails: "",
    },
  });

  const { createItem } = usePost("/influencer-bookings");

  const selectedPrice =
    influencer.pricing.find((p) => p.duration === selectedDuration)
      ?.price || 0;

  const onSubmit = async (data: BookingFormValues) => {
    const res = await createItem({
      ...data,
      influencer: influencer._id,
      duration: selectedDuration,
      price: selectedPrice,
    });

    if (res.success) {
      notify.success(res.message);

      onClose();
      form.reset();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl p-0 gap-0 bg-background border-border/40 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <DialogHeader className="flex flex-row items-center justify-between p-6 border-b border-border/40 sticky top-0 bg-background z-10">
          <div>
            <DialogTitle className="text-sm tracking-[0.2em] uppercase opacity-60 mb-1">
              Book {influencer.name}
            </DialogTitle>
            <p className="text-xs opacity-40">
              {influencer.designation}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 opacity-40 hover:opacity-100"
            onClick={onClose}
          >
            <X className="w-4 h-4" />
          </Button>
        </DialogHeader>

        {/* Booking Form */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="p-6 space-y-6"
          >
            {/* Model preview */}
            <div className="flex items-center gap-4 p-4 border border-border/40 bg-primary/5 rounded-none">
              <div className="w-12 h-12 relative overflow-hidden rounded-full">
                <Image
                  src={influencer.image}
                  alt={influencer.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-light">
                  {influencer.name}
                </p>
                <p className="text-xs opacity-40">
                  {influencer.designation}
                </p>
              </div>
            </div>

            {/* Duration Selection */}
            <div className="space-y-3">
              <label className="block text-xs tracking-wide opacity-40 flex items-center gap-2">
                <Clock className="w-3.5 h-3.5" />
                Select video duration *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {influencer.pricing.map((option: any) => (
                  <button
                    key={option.duration}
                    type="button"
                    onClick={() =>
                      setSelectedDuration(option.duration)
                    }
                    className={`p-3 border transition-all duration-300 ${
                      selectedDuration === option.duration
                        ? "border-primary/30 bg-primary/5"
                        : "border-border/40 hover:border-border/60"
                    }`}
                  >
                    <span className="text-xs block">
                      {option.duration}
                    </span>
                    <span className="text-sm font-light text-primary/80">
                      ${option.price}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-xs tracking-wide opacity-40 flex items-center gap-2">
                    <User className="w-3.5 h-3.5" />
                    Your name *
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John Doe"
                      className="bg-transparent border-border/60 focus:border-primary/60 rounded-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-400" />
                </FormItem>
              )}
            />

            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-xs tracking-wide opacity-40 flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5" />
                    Email address *
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      className="bg-transparent border-border/60 focus:border-primary/60 rounded-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-400" />
                </FormItem>
              )}
            />

            {/* Phone Field - Now Required */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-xs tracking-wide opacity-40 flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5" />
                    Phone number *
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      className="bg-transparent border-border/60 focus:border-primary/60 rounded-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-400" />
                </FormItem>
              )}
            />

            {/* Company Field - Now Required */}
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-xs tracking-wide opacity-40 flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5" />
                    Company name *
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your Company LLC"
                      className="bg-transparent border-border/60 focus:border-primary/60 rounded-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-400" />
                </FormItem>
              )}
            />

            {/* Project Details */}
            <FormField
              control={form.control}
              name="projectDetails"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-xs tracking-wide opacity-40 flex items-center gap-2">
                    <Film className="w-3.5 h-3.5" />
                    Project details *
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      rows={3}
                      placeholder="Tell us about your campaign or video requirements..."
                      className="bg-transparent border-border/60 focus:border-primary/60 rounded-none resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-400" />
                </FormItem>
              )}
            />

            {/* Price Summary */}
            <div className="p-4 border border-primary/20 bg-primary/5 rounded-none">
              <div className="flex justify-between items-center">
                <span className="text-xs opacity-60">
                  Total estimate
                </span>
                <span className="text-xl font-light">
                  ${selectedPrice}
                </span>
              </div>
              <p className="text-[10px] opacity-30 mt-2">
                *Final price may vary based on specific requirements
              </p>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="relative overflow-hidden group w-full bg-transparent border border-border/60 hover:border-primary/50 text-foreground hover:text-white uppercase text-xs tracking-[0.2em] px-8 py-5 rounded-none transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {form.formState.isSubmitting ? (
                  "Submitting..."
                ) : (
                  <>
                    Send Booking Request
                    <Calendar className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </span>
              <div className="absolute inset-0 bg-primary/5 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
