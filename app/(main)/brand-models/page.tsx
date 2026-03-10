"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Play,
  X,
  Calendar,
  Mail,
  Phone,
  User,
  Film,
  Clock,
  DollarSign,
} from "lucide-react";
import Link from "next/link";
import ModelImage from "@/assets/model.jpg";

// Brand models data array
const brandModels = [
  {
    id: 1,
    name: "Sophie Williams",
    designation: "Brand Model & Influencer",
    bio: "Sophie Williams is a professional brand model who collaborates with companies to promote products through engaging promotional videos. With over 5 years of experience in fashion and lifestyle campaigns, she brings authenticity and charisma to every project.",
    image: ModelImage,
    demoVideo: "https://example.com/demo-video2.mp4",
    pricing: [
      { duration: "30 sec", price: 3000 },
      { duration: "60 sec", price: 5000 },
      { duration: "2 min", price: 7000 },
      { duration: "5 min", price: 10000 },
    ],
  },
  {
    id: 2,
    name: "James Rodriguez",
    designation: "Commercial Model & Brand Ambassador",
    bio: "James specializes in commercial and corporate brand representation. His professional demeanor and versatile look make him ideal for business, tech, and lifestyle campaigns targeting modern audiences.",
    image: ModelImage,
    demoVideo: "https://example.com/demo-video2.mp4",
    pricing: [
      { duration: "30 sec", price: 3500 },
      { duration: "60 sec", price: 5500 },
      { duration: "2 min", price: 7500 },
      { duration: "5 min", price: 11000 },
    ],
  },
  {
    id: 3,
    name: "Elena Martinez",
    designation: "Lifestyle Model & Content Creator",
    bio: "Elena creates authentic lifestyle content that resonates with millennial and Gen Z audiences. Her expertise includes social media campaigns, product placements, and brand storytelling through video.",
    image: ModelImage,
    pricing: [
      { duration: "30 sec", price: 2800 },
      { duration: "60 sec", price: 4800 },
      { duration: "2 min", price: 6800 },
      { duration: "5 min", price: 9500 },
    ],
  },
];

// Demo Video Modal
function DemoVideoModal({
  isOpen,
  onClose,
  videoUrl,
  modelName,
}: {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  modelName: string;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl bg-card border border-border/40">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border/40">
          <h3 className="text-sm tracking-[0.2em] uppercase opacity-60">
            {modelName} - Demo Reel
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center opacity-40 hover:opacity-100 transition-opacity"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Video Player */}
        <div className="aspect-video bg-black/90 flex items-center justify-center">
          <div className="text-center">
            <Film className="w-12 h-12 opacity-20 mx-auto mb-3" />
            <p className="text-xs opacity-40">
              Demo video would play here
            </p>
            <p className="text-[10px] opacity-30 mt-2">{videoUrl}</p>
          </div>
          {/* In production, use a video player component:
          <video controls className="w-full h-full">
            <source src={videoUrl} type="video/mp4" />
          </video>
          */}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border/40">
          <p className="text-xs opacity-30 text-center">
            *Demo reel shows recent work and professional experience
          </p>
        </div>
      </div>
    </div>
  );
}

// Booking Modal
function BookingModal({
  isOpen,
  onClose,
  model,
}: {
  isOpen: boolean;
  onClose: () => void;
  model: (typeof brandModels)[0];
}) {
  const [selectedDuration, setSelectedDuration] = useState(
    model.pricing[0].duration,
  );
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectDetails: "",
  });

  if (!isOpen) return null;

  const selectedPrice =
    model.pricing.find((p) => p.duration === selectedDuration)
      ?.price || 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      ...formData,
      model: model.name,
      duration: selectedDuration,
      price: selectedPrice,
    });
    // Handle booking submission
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-card border border-border/40 my-8">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border/40">
          <div>
            <h3 className="text-sm tracking-[0.2em] uppercase opacity-60 mb-1">
              Book {model.name}
            </h3>
            <p className="text-xs opacity-40">{model.designation}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center opacity-40 hover:opacity-100 transition-opacity"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Booking Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Model preview */}
          <div className="flex items-center gap-4 p-4 border border-border/40 bg-primary/5">
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
              <p className="text-xs opacity-40">
                {model.designation}
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
          <div className="space-y-2">
            <label className="block text-xs tracking-wide opacity-40 flex items-center gap-2">
              <User className="w-3.5 h-3.5" />
              Your name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full bg-transparent border-b border-border/60 py-2 text-sm opacity-80 focus:opacity-100 focus:border-primary/60 outline-none transition-all duration-300"
              placeholder="John Doe"
            />
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label className="block text-xs tracking-wide opacity-40 flex items-center gap-2">
              <Mail className="w-3.5 h-3.5" />
              Email address *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full bg-transparent border-b border-border/60 py-2 text-sm opacity-80 focus:opacity-100 focus:border-primary/60 outline-none transition-all duration-300"
              placeholder="john@example.com"
            />
          </div>

          {/* Phone Field */}
          <div className="space-y-2">
            <label className="block text-xs tracking-wide opacity-40 flex items-center gap-2">
              <Phone className="w-3.5 h-3.5" />
              Phone number
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="w-full bg-transparent border-b border-border/60 py-2 text-sm opacity-80 focus:opacity-100 focus:border-primary/60 outline-none transition-all duration-300"
              placeholder="+1 (555) 123-4567"
            />
          </div>

          {/* Company Field */}
          <div className="space-y-2">
            <label className="block text-xs tracking-wide opacity-40 flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5" />
              Company name
            </label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) =>
                setFormData({ ...formData, company: e.target.value })
              }
              className="w-full bg-transparent border-b border-border/60 py-2 text-sm opacity-80 focus:opacity-100 focus:border-primary/60 outline-none transition-all duration-300"
              placeholder="Your Company LLC"
            />
          </div>

          {/* Project Details */}
          <div className="space-y-2">
            <label className="block text-xs tracking-wide opacity-40 flex items-center gap-2">
              <Film className="w-3.5 h-3.5" />
              Project details *
            </label>
            <textarea
              required
              rows={3}
              value={formData.projectDetails}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  projectDetails: e.target.value,
                })
              }
              className="w-full bg-transparent border-b border-border/60 py-2 text-sm opacity-80 focus:opacity-100 focus:border-primary/60 outline-none resize-none transition-all duration-300"
              placeholder="Tell us about your campaign or video requirements..."
            />
          </div>

          {/* Price Summary */}
          <div className="p-4 border border-primary/20 bg-primary/5">
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
            className="relative overflow-hidden group w-full bg-transparent border border-border/60 hover:border-primary/50 text-foreground uppercase text-xs tracking-[0.2em] px-8 py-5 rounded-none transition-all duration-500"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Send Booking Request
              <Calendar className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-primary/5 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
          </Button>
        </form>
      </div>
    </div>
  );
}

// Main Brand Model Page
export default function BrandModelPage() {
  const [demoVideoOpen, setDemoVideoOpen] = useState<number | null>(
    null,
  );
  const [bookingOpen, setBookingOpen] = useState<number | null>(null);

  const selectedModel = brandModels.find((m) => m.id === bookingOpen);

  return (
    <section className="py-20 lg:py-28 bg-card min-h-screen">
      {/* Demo Video Modal */}
      {brandModels.map((model) => (
        <DemoVideoModal
          key={model.id}
          isOpen={demoVideoOpen === model.id}
          onClose={() => setDemoVideoOpen(null)}
          videoUrl={model.demoVideo}
          modelName={model.name}
        />
      ))}

      {/* Booking Modal */}
      {selectedModel && (
        <BookingModal
          isOpen={bookingOpen !== null}
          onClose={() => setBookingOpen(null)}
          model={selectedModel}
        />
      )}

      <div className="container mx-auto px-4">
        {/* Minimal Section Header */}
        <div className="max-w-3xl mx-auto mb-16 lg:mb-20 text-center">
          <div className="inline-block">
            <div className="w-12 h-0.5 bg-primary mx-auto mb-6"></div>
          </div>
          <h2 className="text-3xl lg:text-4xl font-light tracking-tight mb-5">
            Our Brand Models
          </h2>
          <p className="text-base lg:text-lg max-w-2xl mx-auto leading-relaxed opacity-60">
            Professional models ready to bring your brand to life
            through authentic video content.
          </p>
        </div>

        {/* Models Grid */}
        <div className="max-w-6xl mx-auto space-y-8">
          {brandModels.map((model) => (
            <div
              key={model.id}
              className="grid md:grid-cols-3 gap-8 border border-border/40 p-6 lg:p-8 group hover:border-primary/20 transition-all duration-500"
            >
              {/* Image Column */}
              <div className="md:col-span-1">
                <div className="aspect-[3/4] relative overflow-hidden bg-muted">
                  <Image
                    src={model.image}
                    alt={model.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden">
                    <div className="absolute top-0 right-0 w-12 h-12 bg-primary/10 rotate-45 translate-x-6 -translate-y-6 group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform duration-500"></div>
                  </div>
                </div>
              </div>

              {/* Content Column */}
              <div className="md:col-span-2 flex flex-col justify-between">
                <div>
                  {/* Name */}
                  <h3 className="text-2xl lg:text-3xl font-light tracking-tight mb-2">
                    {model.name}
                  </h3>

                  {/* Designation */}
                  <p className="text-xs tracking-[0.2em] uppercase opacity-40 mb-4">
                    {model.designation}
                  </p>

                  {/* Bio */}
                  <p className="text-sm opacity-70 leading-relaxed mb-6">
                    {model.bio}
                  </p>

                  {/* Pricing Preview */}
                  <div className="mb-8">
                    <p className="text-xs tracking-wide opacity-40 mb-3">
                      Starting rates
                    </p>
                    <div className="flex flex-wrap gap-4">
                      {model.pricing.slice(0, 2).map((item) => (
                        <div
                          key={item.duration}
                          className="flex items-center gap-2 text-sm"
                        >
                          <Clock className="w-3.5 h-3.5 opacity-40" />
                          <span>{item.duration}</span>
                          <span className="text-primary/80">
                            ${item.price}
                          </span>
                        </div>
                      ))}
                      <span className="text-xs opacity-30 self-center">
                        + more options
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  <Button
                    onClick={() => setDemoVideoOpen(model.id)}
                    className="relative overflow-hidden group/btn bg-transparent border border-border/60 hover:border-primary/50 text-foreground uppercase text-xs tracking-[0.2em] px-6 py-5 rounded-none transition-all duration-500"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <Play className="w-3 h-3" />
                      Demo Video
                    </span>
                    <div className="absolute inset-0 bg-primary/5 -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500"></div>
                  </Button>

                  <Button
                    onClick={() => setBookingOpen(model.id)}
                    className="relative overflow-hidden group/btn bg-transparent border border-primary/30 hover:border-primary text-foreground uppercase text-xs tracking-[0.2em] px-6 py-5 rounded-none transition-all duration-500"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <Calendar className="w-3 h-3" />
                      Book Now
                    </span>
                    <div className="absolute inset-0 bg-primary/10 -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500"></div>
                  </Button>
                </div>

                {/* Accent line */}
                <div className="w-12 h-px bg-primary/30 mt-6 group-hover:w-20 transition-all duration-300"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom accent */}
        <div className="text-center mt-20">
          <span className="text-xs tracking-[0.3em] uppercase opacity-40">
            Book your perfect brand model
          </span>
        </div>
      </div>

      {/* Corner accents */}
      <div className="fixed bottom-0 left-0 w-12 h-12 border-l border-b border-primary/5 pointer-events-none"></div>
      <div className="fixed bottom-0 right-0 w-12 h-12 border-r border-b border-primary/5 pointer-events-none"></div>
    </section>
  );
}
