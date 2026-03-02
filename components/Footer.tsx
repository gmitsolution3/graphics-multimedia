import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import Logo from "@/assets/logo.png";
import Image from "next/image";

const footerLinks = {
  services: [
    { label: "SEO Optimization", href: "#" },
    { label: "PPC Advertising", href: "#" },
    { label: "Social Media", href: "#" },
    { label: "Content Strategy", href: "#" },
    { label: "Web Development", href: "#" },
  ],
  company: [
    { label: "About Us", href: "#about" },
    { label: "Our Team", href: "#team" },
    { label: "Careers", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Contact", href: "#" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
};

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer className="bg-foreground text-background border-t border-border">
      <div className="container mx-auto px-4 py-16 lg:py-20">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-24">
                <Image
                  src={Logo}
                  height={300}
                  width={300}
                  alt="Header Logo"
                />
              </div>
            </Link>

            <p className="text-sm opacity-60 mb-8 max-w-sm leading-relaxed mt-3">
              Strategic digital solutions for modern brands.
            </p>

            {/* Contact Info - Minimal styling */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm opacity-60 group hover:opacity-100 transition-opacity">
                <Mail className="w-4 h-4 text-primary/60 group-hover:text-primary transition-colors" />
                <span>hello@nexusdigital.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm opacity-60 group hover:opacity-100 transition-opacity">
                <Phone className="w-4 h-4 text-primary/60 group-hover:text-primary transition-colors" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-sm opacity-60 group hover:opacity-100 transition-opacity">
                <MapPin className="w-4 h-4 text-primary/60 group-hover:text-primary transition-colors" />
                <span>San Francisco, CA</span>
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
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm opacity-60 hover:opacity-100 hover:text-primary transition-all duration-300 inline-block group"
                  >
                    <span className="flex items-center gap-2">
                      {link.label}
                      <span className="w-4 h-px bg-primary/0 group-hover:bg-primary/60 group-hover:w-6 transition-all duration-300"></span>
                    </span>
                  </Link>
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
                    className="text-sm opacity-60 hover:opacity-100 hover:text-primary transition-all duration-300 inline-block group"
                  >
                    <span className="flex items-center gap-2">
                      {link.label}
                      <span className="w-4 h-px bg-primary/0 group-hover:bg-primary/60 group-hover:w-6 transition-all duration-300"></span>
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
                    className="text-sm opacity-60 hover:opacity-100 hover:text-primary transition-all duration-300 inline-block group"
                  >
                    <span className="flex items-center gap-2">
                      {link.label}
                      <span className="w-4 h-px bg-primary/0 group-hover:bg-primary/60 group-hover:w-6 transition-all duration-300"></span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex items-center justify-end pe-30">
          <p className="text- opacity-40">
            Powered by{" "}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-60 hover:opacity-100 text-sky-500 transition-all duration-300 font-medium"
            >
              gm group
            </a>
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mt-16 pt-8 border-t border-border/50">
          <p className="text-xs opacity-40 order-2 md:order-1">
            © {new Date().getFullYear()} Graphics Multimedia
          </p>

          {/* Social Links - Minimal styling */}
          <div className="flex items-center gap-6 order-1 md:order-2">
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                className="opacity-40 hover:opacity-100 transition-opacity group"
                aria-label={social.label}
              >
                <social.icon className="w-4 h-4 group-hover:text-primary transition-colors" />
              </Link>
            ))}
          </div>
        </div>

        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-12 h-12 border-l border-t border-primary/5 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-12 h-12 border-r border-b border-primary/5 pointer-events-none"></div>
      </div>
    </footer>
  );
}
