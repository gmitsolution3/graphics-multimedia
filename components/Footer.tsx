import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import Image from "next/image";
import { getServices } from "@/services/servicesService";
import { IService } from "@/types";

const footerLinks = {
  services: [
    { label: "SEO Optimization", href: "/#services" },
    { label: "PPC Advertising", href: "/#services" },
    { label: "Social Media", href: "/#services" },
    { label: "Content Strategy", href: "/#services" },
    { label: "Web Development", href: "/#services" },
  ],
  company: [
    { label: "About Us", href: "/#about" },
    { label: "Our Team", href: "/#team" },
    { label: "Careers", href: "/carrier" },
    { label: "Contact", href: "/#contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms-conditions" },
    { label: "Cookie Policy", href: "/cookie-policy" },
  ],
};

const socialLinks = [
  {
    icon: Facebook,
    href: "https://www.facebook.com/graphicsmultimedia.net",
    label: "Facebook",
  },
  {
    icon: Instagram,
    href: "https://www.instagram.com/graphicsmultimedia1?igsh=bnZlMGZmNjk4MWR2",
    label: "Instagram",
  },
  {
    icon: Youtube,
    href: "https://www.youtube.com/@graphicsMultimedia1122",
    label: "Youtube",
  },
];

export default async function Footer() {
  const { data: services } = await getServices();

  return (
    <footer className="bg-primary text-background border-t border-border relative">
      <div className="container mx-auto px-4 py-16 lg:py-20">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-24">
                <Image
                  src="/images/logoWhite.png"
                  height={300}
                  width={300}
                  alt="Footer Logo"
                />
              </div>
            </Link>

            <p className="text-sm opacity-60 mb-8 max-w-sm leading-relaxed mt-3">
              Strategic digital solutions for modern brands.
            </p>

            {/* Contact Info - Minimal styling */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm opacity-60 group hover:opacity-100 transition-opacity">
                <Mail className="w-4 h-4 text-white transition-colors" />
                <span>graphicsmultimedia.net</span>
              </div>
              <div className="flex items-center gap-3 text-sm opacity-60 group hover:opacity-100 transition-opacity">
                <Phone className="w-4 h-4 text-white transition-colors" />
                <div>
                  <a href="tel:+8801898796506">+880 1898-796506</a>{" "}
                  <br />
                  <a href="tel:+8801898796507">+880 1898-796507</a>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm opacity-60 group hover:opacity-100 transition-opacity">
                <MapPin className="w-4 h-4 text-white transition-colors" />
                <span>
                  2nd Floor, House-1, Road-1, Section-7, Mirpur-11,
                  Dhaka-1216
                </span>
              </div>
            </div>

            {/* Subtle accent line */}
            <div className="w-12 h-px bg-primary/30 mt-8"></div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase opacity-40 mb-6">
              Services
            </h4>
            <ul className="space-y-3">
              {services.map((service: IService) => (
                <li key={service._id}>
                  <div className="text-sm opacity-60 hover:opacity-100 hover:text-white transition-all duration-300 inline-block group">
                    <span className="flex items-center gap-2">
                      {service.name}
                      <span className="w-4 h-px bg-primary/0 group-hover:bg-white/60 group-hover:w-6 transition-all duration-300"></span>
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase opacity-40 mb-6">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm opacity-60 hover:opacity-100 hover:text-white transition-all duration-300 inline-block group"
                  >
                    <span className="flex items-center gap-2">
                      {link.label}
                      <span className="w-4 h-px bg-primary/0 group-hover:bg-white/60 group-hover:w-6 transition-all duration-300"></span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase opacity-40 mb-6">
              Legal
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm opacity-60 hover:opacity-100 hover:text-white transition-all duration-300 inline-block group"
                  >
                    <span className="flex items-center gap-2">
                      {link.label}
                      <span className="w-4 h-px bg-primary/0 group-hover:bg-white/60 group-hover:w-6 transition-all duration-300"></span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Upper Bar with Icons and Powered By */}
        <div className="flex items-center justify-between mt-12 pt-8">
          <div className="flex items-center gap-6">
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                className="text-white opacity-70 hover:opacity-100 transition-opacity group"
                aria-label={social.label}
                target="_blank"
              >
                <social.icon className="w-4 h-4 transition-colors" />
              </Link>
            ))}
          </div>

          <p className="text-sm">
            Powered by{" "}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className=" text-gray-300 transition-all duration-300 font-medium"
            >
              gm group
            </a>
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mt-8 pt-8 border-t border-border/50">
          <p className="text-xs opacity-80">
            © {new Date().getFullYear()} Graphics Multimedia
          </p>
          <p className="text-xs">
            Developed by <a href="https://www.gmitsolution.net" target="_blank" rel="noopener noreferrer" className="text-gray-300">GM IT Solution</a>
          </p>
        </div>

        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-12 h-12 border-l border-t border-primary/5 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-12 h-12 border-r border-b border-primary/5 pointer-events-none"></div>
      </div>
    </footer>
  );
}
