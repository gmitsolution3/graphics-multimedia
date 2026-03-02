"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import Link from "next/link";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-card">
      <div className="container mx-auto px-4">
        {/* Minimal Section Header */}
        <div className="max-w-3xl mx-auto mb-16 lg:mb-20 text-center">
          <div className="inline-block">
            <div className="w-12 h-0.5 bg-primary mx-auto mb-6"></div>
          </div>
          <h2 className="text-3xl lg:text-4xl font-light tracking-tight mb-5">
            Let's work together
          </h2>
          <p className="text-base lg:text-lg max-w-2xl mx-auto leading-relaxed opacity-60">
            Tell us about your project and we'll get back to you
            within 24 hours.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20">
            {/* Contact Information */}
            <div className="space-y-10">
              <div>
                <h3 className="text-xs tracking-[0.2em] uppercase opacity-40 mb-6">
                  Get in touch
                </h3>
                <div className="space-y-6">
                  {/* Email */}
                  <a
                    href="mailto:hello@nexusdigital.com"
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-10 h-10 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-primary/60 group-hover:text-primary transition-colors" />
                    </div>
                    <div>
                      <p className="text-xs opacity-40 mb-1">Email</p>
                      <p className="text-sm opacity-80 group-hover:opacity-100 transition-opacity">
                        hello@nexusdigital.com
                      </p>
                    </div>
                  </a>

                  {/* Phone */}
                  <a
                    href="tel:+15551234567"
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-10 h-10 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-primary/60 group-hover:text-primary transition-colors" />
                    </div>
                    <div>
                      <p className="text-xs opacity-40 mb-1">Phone</p>
                      <p className="text-sm opacity-80 group-hover:opacity-100 transition-opacity">
                        +1 (555) 123-4567
                      </p>
                    </div>
                  </a>

                  {/* Address */}
                  <div className="flex items-center gap-4 group">
                    <div className="w-10 h-10 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-primary/60 group-hover:text-primary transition-colors" />
                    </div>
                    <div>
                      <p className="text-xs opacity-40 mb-1">
                        Office
                      </p>
                      <p className="text-sm opacity-80">
                        123 Digital Avenue
                        <br />
                        San Francisco, CA 94105
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Subtle accent line */}
              <div className="w-12 h-px bg-primary/30"></div>

              {/* Availability */}
              <div>
                <h3 className="text-xs tracking-[0.2em] uppercase opacity-40 mb-4">
                  Available for
                </h3>
                <div className="flex flex-wrap gap-3">
                  {[
                    "Branding",
                    "Web Design",
                    "SEO",
                    "Social Media",
                    "Content",
                  ].map((item) => (
                    <span
                      key={item}
                      className="text-xs px-4 py-2 border border-border/60 opacity-60 hover:opacity-100 hover:border-primary/30 transition-all duration-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Social links (optional) */}
              <div className="pt-6">
                <p className="text-xs opacity-40 mb-4">Follow us</p>
                <div className="flex items-center gap-5">
                  {["FB", "IG", "TW", "LI"].map((social) => (
                    <Link
                      key={social}
                      href="#"
                      className="text-xs opacity-40 hover:opacity-100 hover:text-primary transition-all"
                    >
                      {social}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Name Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="block text-xs tracking-wide opacity-40"
                  >
                    Your name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-b border-primary/60 py-3 text-sm opacity-80 focus:opacity-100 focus:border-primary/60 outline-none transition-all duration-300"
                    placeholder="John Doe"
                  />
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-xs tracking-wide opacity-40"
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-b border-primary/60 py-3 text-sm opacity-80 focus:opacity-100 focus:border-primary/60 outline-none transition-all duration-300"
                    placeholder="john@example.com"
                  />
                </div>

                {/* Message Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="block text-xs tracking-wide opacity-40"
                  >
                    Your message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full bg-transparent border-b border-primary/60 py-3 text-sm opacity-80 focus:opacity-100 focus:border-primary/60 outline-none resize-none transition-all duration-300"
                    placeholder="Tell us about your project..."
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    className="relative overflow-hidden group bg-transparent border border-border/60 hover:border-primary/50 text-foreground hover:text-white uppercase text-xs tracking-[0.2em] px-8 py-6 rounded-none transition-all duration-500 w-full"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Send Message
                      <Send className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-primary/5 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                  </Button>
                </div>

                {/* Form note */}
                <p className="text-xs opacity-30 text-center mt-6">
                  We'll get back to you within 24 hours
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom accent */}
        <div className="text-center mt-20">
          <span className="text-xs tracking-[0.3em] uppercase opacity-40">
            Start your project today
          </span>
        </div>
      </div>

      {/* Corner accents */}
      <div className="absolute bottom-0 left-0 w-12 h-12 border-l border-b border-primary/5 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-12 h-12 border-r border-b border-primary/5 pointer-events-none"></div>
    </section>
  );
}
