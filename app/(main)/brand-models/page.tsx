// app/brand-model/page.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Play, Calendar, Clock } from "lucide-react";
import ModelImage from "@/assets/model.jpg";
import BrandModelDemoVideoModal from "@/components/modals/BrandModelDemoVideoModal";
import BrandModelBookingModal from "@/components/modals/BrandModelBookingModal";

const brandModels = [
  {
    id: 1,
    name: "Sophie Williams",
    designation: "Brand Model & Influencer",
    bio: "Sophie Williams is a professional brand model who collaborates with companies to promote products through engaging promotional videos. With over 5 years of experience in fashion and lifestyle campaigns, she brings authenticity and charisma to every project.",
    image: ModelImage,
    demoVideo: "https://youtu.be/j-e626ulUCc?si=UOwiKJi6Wxzfbp2e",
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
    demoVideo: "https://youtu.be/j-e626ulUCc?si=UOwiKJi6Wxzfbp2e",
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
    demoVideo: "https://youtu.be/j-e626ulUCc?si=UOwiKJi6Wxzfbp2e",
    pricing: [
      { duration: "30 sec", price: 2800 },
      { duration: "60 sec", price: 4800 },
      { duration: "2 min", price: 6800 },
      { duration: "5 min", price: 9500 },
    ],
  },
];

// Main Brand Model Page
export default function BrandModelPage() {
  const [demoVideoOpen, setDemoVideoOpen] = useState<boolean>(false);
  const [bookingOpen, setBookingOpen] = useState<boolean>(false);
  const [selectedModelForVideo, setSelectedModelForVideo] = useState<
    (typeof brandModels)[0] | null
  >(null);
  const [selectedModelForBooking, setSelectedModelForBooking] =
    useState<(typeof brandModels)[0] | null>(null);

  const handleDemoVideoClick = (model: (typeof brandModels)[0]) => {
    setSelectedModelForVideo(model);
    setDemoVideoOpen(true);
  };

  const handleCloseDemoVideo = () => {
    setDemoVideoOpen(false);
    setSelectedModelForVideo(null);
  };

  const handleBookingClick = (model: (typeof brandModels)[0]) => {
    setSelectedModelForBooking(model);
    setBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setBookingOpen(false);
    setSelectedModelForBooking(null);
  };

  return (
    <section className="py-20 lg:py-28 bg-card min-h-screen">
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
                    onClick={() => handleDemoVideoClick(model)}
                    className="relative overflow-hidden group/btn bg-transparent border border-border/60 hover:border-primary/50 text-foreground hover:text-white uppercase text-xs tracking-[0.2em] px-6 py-5 rounded-none transition-all duration-500"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <Play className="w-3 h-3" />
                      Demo Video
                    </span>
                    <div className="absolute inset-0 bg-primary/5 -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500"></div>
                  </Button>

                  <Button
                    onClick={() => handleBookingClick(model)}
                    className="relative overflow-hidden group/btn bg-transparent border border-primary/30 hover:border-primary text-foreground hover:text-white uppercase text-xs tracking-[0.2em] px-6 py-5 rounded-none transition-all duration-500"
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

      {/* Demo Video Modal */}
      {selectedModelForVideo && (
        <BrandModelDemoVideoModal
          isOpen={demoVideoOpen}
          onClose={handleCloseDemoVideo}
          videoUrl={selectedModelForVideo.demoVideo}
          modelName={selectedModelForVideo.name}
        />
      )}

      {/* Booking Modal */}
      {selectedModelForBooking && (
        <BrandModelBookingModal
          isOpen={bookingOpen}
          onClose={handleCloseBooking}
          model={selectedModelForBooking}
        />
      )}
    </section>
  );
}
