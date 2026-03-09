"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Mail, ArrowRight, Bell } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/assets/logo.png";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Validation schema for email notification
const notifySchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .min(1, "Email is required"),
});

type NotifyFormData = z.infer<typeof notifySchema>;

// Countdown timer component
function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Set launch date: 30 days from now
  const launchDate = new Date();
  launchDate.setDate(launchDate.getDate() + 30);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate.getTime() - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        ),
        minutes: Math.floor(
          (distance % (1000 * 60 * 60)) / (1000 * 60),
        ),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex justify-center gap-4 sm:gap-8">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="text-center">
          <div className="text-3xl sm:text-4xl lg:text-5xl font-light text-primary/80 mb-2">
            {value.toString().padStart(2, "0")}
          </div>
          <div className="text-[10px] sm:text-xs tracking-[0.2em] uppercase opacity-30">
            {unit}
          </div>
          {/* Subtle accent line */}
          <div className="w-8 h-px bg-primary/30 mx-auto mt-3"></div>
        </div>
      ))}
    </div>
  );
}

export default function ComingSoon() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NotifyFormData>({
    resolver: zodResolver(notifySchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: NotifyFormData) => {
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Notify me:", data.email);
    setIsSubmitted(true);
    setIsLoading(false);
    reset();

    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-card flex flex-col items-center justify-center p-4 relative pt-[150px]">
      {/* Corner accents */}
      <div className="fixed top-0 left-0 w-24 h-24 border-l border-t border-primary/5 pointer-events-none"></div>
      <div className="fixed top-0 right-0 w-24 h-24 border-r border-t border-primary/5 pointer-events-none"></div>
      <div className="fixed bottom-0 left-0 w-24 h-24 border-l border-b border-primary/5 pointer-events-none"></div>
      <div className="fixed bottom-0 right-0 w-24 h-24 border-r border-b border-primary/5 pointer-events-none"></div>

      {/* Main content */}
      <div className="w-full max-w-3xl mx-auto text-center">
        {/* Logo */}
        <Link href="/" className="inline-block mb-12 group">
          <div className="w-32 mx-auto opacity-80 group-hover:opacity-100 transition-opacity">
            <Image
              src={Logo}
              alt="Logo"
              width={120}
              height={40}
              className="w-full h-auto"
            />
          </div>
        </Link>

        {/* Decorative line */}
        <div className="w-12 h-0.5 bg-primary mx-auto mb-8"></div>

        {/* Coming Soon badge */}
        <div className="inline-block mb-6">
          <span className="text-xs tracking-[0.3em] uppercase opacity-40 border border-primary/20 px-4 py-2">
            Coming Soon
          </span>
        </div>

        {/* Main headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight mb-6">
          Something
          <span className="text-primary/90 block sm:inline">
            {" "}
            amazing
          </span>{" "}
          is coming
        </h1>

        {/* Description */}
        <p className="text-sm sm:text-base opacity-60 max-w-lg mx-auto mb-12 leading-relaxed">
          We're working hard to bring you something extraordinary.
          Stay tuned for the launch of our new digital experience.
        </p>

        {/* Countdown Timer */}
        <div className="mb-16">
          <CountdownTimer />
        </div>

        {/* Notify Form */}
        <div className="max-w-md mx-auto mb-16">
          {isSubmitted ? (
            <div className="p-4 border border-primary/20 bg-primary/5">
              <p className="text-sm opacity-80 flex items-center justify-center gap-2">
                <Bell className="w-4 h-4 text-primary" />
                Thanks! We'll notify you when we launch.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <div className="relative">
                <div className="flex items-center border-b border-border/60 focus-within:border-primary/60 transition-colors">
                  <Mail className="w-4 h-4 opacity-40 ml-2" />
                  <input
                    type="email"
                    {...register("email")}
                    placeholder="Enter your email for updates"
                    className="w-full bg-transparent py-4 px-3 text-sm opacity-80 focus:opacity-100 outline-none"
                  />
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="relative overflow-hidden group bg-transparent border-0 hover:bg-transparent text-foreground/60 hover:text-primary transition-colors px-2"
                  >
                    <span className="relative z-10 flex items-center gap-1 text-xs tracking-wider">
                      {isLoading ? "Sending..." : "Notify me"}
                      {!isLoading && (
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      )}
                    </span>
                  </Button>
                </div>
              </div>
              {errors.email && (
                <p className="text-xs text-red-500/70 text-left">
                  {errors.email.message}
                </p>
              )}
              <p className="text-[10px] opacity-30 text-left">
                *We'll never share your email. Unsubscribe anytime.
              </p>
            </form>
          )}
        </div>

        {/* Bottom accent */}
        <div className="text-center">
          <span className="text-[10px] tracking-[0.3em] uppercase opacity-30">
            Launching soon
          </span>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute left-10 bottom-20 w-40 h-40 border border-primary/5 rounded-full pointer-events-none"></div>
      <div className="absolute right-10 top-20 w-60 h-60 border border-primary/5 rounded-full pointer-events-none"></div>

      {/* Grid lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px),
                            linear-gradient(to bottom, #000 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      ></div>
    </div>
  );
}
