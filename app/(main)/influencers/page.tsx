"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Play, Calendar, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import ModelImage from "@/assets/model.jpg";
import InfluencerDemoVideoModal from "@/components/modals/InfluencerDemoVideoModal";
import InfluencerBookingModal from "@/components/modals/InfluencerBookingModal";

import { useGetInfluencers } from "@/hooks/swr/useGetInfluencers";

// Main Brand Model Page
export default function InfluencersPage() {
  const [demoVideoOpen, setDemoVideoOpen] = useState<boolean>(false);
  const [bookingOpen, setBookingOpen] = useState<boolean>(false);
  const [selectedInfluencerForVideo, setSelectedInfluencerForVideo] =
    useState<any | null>(null);
  const [
    selectedInfluencerForBooking,
    setSelectedInfluencerForBooking,
  ] = useState<any | null>(null);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const { data, isLoading } = useGetInfluencers(page, limit);

  const influencers = data?.data || [];
  const pagination = data?.pagination;

  const handleDemoVideoClick = (
    influencer: any,
  ) => {
    setSelectedInfluencerForVideo(influencer);
    setDemoVideoOpen(true);
  };

  const handleCloseDemoVideo = () => {
    setDemoVideoOpen(false);
    setSelectedInfluencerForVideo(null);
  };

  const handleBookingClick = (
    influencer: any,
  ) => {
    setSelectedInfluencerForBooking(influencer);
    setBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setBookingOpen(false);
    setSelectedInfluencerForBooking(null);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
            Our Influencers
          </h2>
          <p className="text-base lg:text-lg max-w-2xl mx-auto leading-relaxed opacity-60">
            Professional influencers ready to bring your brand to life
            through authentic video content.
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="max-w-6xl mx-auto text-center py-20">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent"></div>
            <p className="mt-4 text-sm opacity-60">Loading influencers...</p>
          </div>
        )}

        {/* Influencers Grid */}
        {!isLoading && (
          <>
            <div className="max-w-6xl mx-auto space-y-8">
              {influencers.map((influencer: any) => (
                <div
                  key={influencer._id}
                  className="grid md:grid-cols-3 gap-8 border border-border/40 p-6 lg:p-8 group hover:border-primary/20 transition-all duration-500"
                >
                  {/* Image Column */}
                  <div className="md:col-span-1">
                    <div className="aspect-[3/4] relative overflow-hidden bg-muted">
                      <Image
                        src={influencer.image || ModelImage}
                        alt={influencer.name}
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
                        {influencer.name}
                      </h3>

                      {/* Designation */}
                      <p className="text-xs tracking-[0.2em] uppercase opacity-40 mb-4">
                        {influencer.designation}
                      </p>

                      {/* Bio */}
                      <p className="text-sm opacity-70 leading-relaxed mb-6">
                        {influencer.bio}
                      </p>

                      {/* Pricing Preview */}
                      <div className="mb-8">
                        <p className="text-xs tracking-wide opacity-40 mb-3">
                          Starting rates
                        </p>
                        <div className="flex flex-wrap gap-4">
                          {influencer.pricing.slice(0, 2).map((item: any) => (
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
                        onClick={() => handleDemoVideoClick(influencer)}
                        className="relative overflow-hidden group/btn bg-transparent border border-border/60 hover:border-primary/50 text-foreground hover:text-white uppercase text-xs tracking-[0.2em] px-6 py-5 rounded-none transition-all duration-500"
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          <Play className="w-3 h-3" />
                          Demo Video
                        </span>
                        <div className="absolute inset-0 bg-primary/5 -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500"></div>
                      </Button>

                      <Button
                        onClick={() => handleBookingClick(influencer)}
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

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div className="max-w-6xl mx-auto mt-16">
                <div className="flex items-center justify-center gap-2">
                  <Button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    variant="outline"
                    size="icon"
                    className="rounded-none border-border/60 hover:border-primary/50 hover:bg-transparent"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  
                  <div className="flex items-center gap-1">
                    {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((pageNum) => (
                      <Button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        variant={pageNum === page ? "default" : "outline"}
                        className={`w-10 h-10 rounded-none text-sm ${
                          pageNum === page 
                            ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                            : 'border-border/60 hover:border-primary/50 hover:bg-transparent'
                        }`}
                      >
                        {pageNum}
                      </Button>
                    ))}
                  </div>

                  <Button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === pagination.totalPages}
                    variant="outline"
                    size="icon"
                    className="rounded-none border-border/60 hover:border-primary/50 hover:bg-transparent"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>

                {/* Page info */}
                <p className="text-center mt-4 text-xs opacity-40">
                  Showing page {page} of {pagination.totalPages} • Total {pagination.total} influencers
                </p>
              </div>
            )}
          </>
        )}

        {/* Bottom accent */}
        <div className="text-center mt-20">
          <span className="text-xs tracking-[0.3em] uppercase opacity-40">
            Book your perfect brand influencer
          </span>
        </div>
      </div>

      {/* Corner accents */}
      <div className="fixed bottom-0 left-0 w-12 h-12 border-l border-b border-primary/5 pointer-events-none"></div>
      <div className="fixed bottom-0 right-0 w-12 h-12 border-r border-b border-primary/5 pointer-events-none"></div>

      {/* Demo Video Modal */}
      {selectedInfluencerForVideo && (
        <InfluencerDemoVideoModal
          isOpen={demoVideoOpen}
          onClose={handleCloseDemoVideo}
          videoUrl={selectedInfluencerForVideo.demoVideo}
          influencerName={selectedInfluencerForVideo.name}
        />
      )}

      {/* Booking Modal */}
      {selectedInfluencerForBooking && (
        <InfluencerBookingModal
          isOpen={bookingOpen}
          onClose={handleCloseBooking}
          influencer={selectedInfluencerForBooking}
        />
      )}
    </section>
  );
}