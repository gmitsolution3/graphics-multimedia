// components/modals/BrandModelBookingModal.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
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
  X,
  Calendar,
  Mail,
  Phone,
  User,
  Film,
  Clock,
} from "lucide-react";

interface PricingOption {
  duration: string;
  price: number;
}

interface Model {
  id: number;
  name: string;
  designation: string;
  bio: string;
  image: any;
  demoVideo: string;
  pricing: PricingOption[];
}

interface BrandModelBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  model: Model;
}

export default function BrandModelBookingModal({
  isOpen,
  onClose,
  model,
}: BrandModelBookingModalProps) {
  const [selectedDuration, setSelectedDuration] = useState(
    model.pricing[0].duration
  );
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectDetails: "",
  });

  const selectedPrice =
    model.pricing.find((p) => p.duration === selectedDuration)?.price || 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      ...formData,
      model: model.name,
      duration: selectedDuration,
      price: selectedPrice,
    });
    // Handle booking submission here
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl p-0 gap-0 bg-background border-border/40 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <DialogHeader className="flex flex-row items-center justify-between p-6 border-b border-border/40 sticky top-0 bg-background z-10">
          <div>
            <DialogTitle className="text-sm tracking-[0.2em] uppercase opacity-60 mb-1">
              Book {model.name}
            </DialogTitle>
            <p className="text-xs opacity-40">{model.designation}</p>
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
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Model preview */}
          <div className="flex items-center gap-4 p-4 border border-border/40 bg-primary/5 rounded-none">
            <div className="w-12 h-12 relative overflow-hidden rounded-full">
              <Image
                src={model.image}
                alt={model.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-light">{model.name}</p>
              <p className="text-xs opacity-40">{model.designation}</p>
            </div>
          </div>

          {/* Duration Selection */}
          <div className="space-y-3">
            <label className="block text-xs tracking-wide opacity-40 flex items-center gap-2">
              <Clock className="w-3.5 h-3.5" />
              Select video duration *
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {model.pricing.map((option) => (
                <button
                  key={option.duration}
                  type="button"
                  onClick={() => setSelectedDuration(option.duration)}
                  className={`p-3 border transition-all duration-300 ${
                    selectedDuration === option.duration
                      ? "border-primary/30 bg-primary/5"
                      : "border-border/40 hover:border-border/60"
                  }`}
                >
                  <span className="text-xs block">{option.duration}</span>
                  <span className="text-sm font-light text-primary/80">
                    ${option.price}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Name Field */}
          <div className="space-y-2">
            <label className="block text-xs tracking-wide opacity-40 flex items-center gap-2">
              <User className="w-3.5 h-3.5" />
              Your name *
            </label>
            <Input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="bg-transparent border-border/60 focus:border-primary/60 rounded-none"
              placeholder="John Doe"
            />
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label className="block text-xs tracking-wide opacity-40 flex items-center gap-2">
              <Mail className="w-3.5 h-3.5" />
              Email address *
            </label>
            <Input
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="bg-transparent border-border/60 focus:border-primary/60 rounded-none"
              placeholder="john@example.com"
            />
          </div>

          {/* Phone Field */}
          <div className="space-y-2">
            <label className="block text-xs tracking-wide opacity-40 flex items-center gap-2">
              <Phone className="w-3.5 h-3.5" />
              Phone number
            </label>
            <Input
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="bg-transparent border-border/60 focus:border-primary/60 rounded-none"
              placeholder="+1 (555) 123-4567"
            />
          </div>

          {/* Company Field */}
          <div className="space-y-2">
            <label className="block text-xs tracking-wide opacity-40 flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5" />
              Company name
            </label>
            <Input
              type="text"
              value={formData.company}
              onChange={(e) =>
                setFormData({ ...formData, company: e.target.value })
              }
              className="bg-transparent border-border/60 focus:border-primary/60 rounded-none"
              placeholder="Your Company LLC"
            />
          </div>

          {/* Project Details */}
          <div className="space-y-2">
            <label className="block text-xs tracking-wide opacity-40 flex items-center gap-2">
              <Film className="w-3.5 h-3.5" />
              Project details *
            </label>
            <Textarea
              required
              rows={3}
              value={formData.projectDetails}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  projectDetails: e.target.value,
                })
              }
              className="bg-transparent border-border/60 focus:border-primary/60 rounded-none resize-none"
              placeholder="Tell us about your campaign or video requirements..."
            />
          </div>

          {/* Price Summary */}
          <div className="p-4 border border-primary/20 bg-primary/5 rounded-none">
            <div className="flex justify-between items-center">
              <span className="text-xs opacity-60">Total estimate</span>
              <span className="text-xl font-light">${selectedPrice}</span>
            </div>
            <p className="text-[10px] opacity-30 mt-2">
              *Final price may vary based on specific requirements
            </p>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="relative overflow-hidden group w-full bg-transparent border border-border/60 hover:border-primary/50 text-foreground uppercase text-xs tracking-[0.2em] px-8 py-5 rounded-none transition-all duration-500"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Send Booking Request
              <Calendar className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-primary/5 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}