"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, Mail, ChevronDown } from "lucide-react";
import Logo from "@/assets/logo.png";
import Image from "next/image";
import { getSession } from "@/lib/auth-client";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "About", href: "/#about" },
  {
    label: "Packages",
    href: "#packages",
    dropdown: [
      { label: "Regular Packages", href: "/packages/regular" },
      { label: "Custom Packages", href: "/packages/custom" },
    ],
  },
  { label: "Team", href: "/#team" },
  { label: "Portfolio", href: "/#portfolio" },
  { label: "Models", href: "/brand-models" },
  { label: "Contact", href: "/#contact" },
];

const FacebookIcon = () => (
  <svg
    className="w-3.5 h-3.5"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const InstagramIcon = () => (
  <svg
    className="w-3.5 h-3.5"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const YouTubeIcon = () => (
  <svg
    className="w-3.5 h-3.5"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M23.498 6.186a2.997 2.997 0 0 0-2.11-2.12C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.388.566a2.997 2.997 0 0 0-2.11 2.12C0 8.07 0 12 0 12s0 3.93.502 5.814a2.997 2.997 0 0 0 2.11 2.12C4.495 20.5 12 20.5 12 20.5s7.505 0 9.388-.566a2.997 2.997 0 0 0 2.11-2.12C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.75 15.568V8.432L15.818 12 9.75 15.568z" />
  </svg>
);

const socialLinks = [
  {
    Icon: FacebookIcon,
    href: "https://www.facebook.com/graphicsmultimedia.net",
    label: "Facebook",
  },
  {
    Icon: InstagramIcon,
    href: "https://www.instagram.com/graphicsmultimedia1?igsh=bnZlMGZmNjk4MWR2",
    label: "Instagram",
  },
  {
    Icon: YouTubeIcon,
    href: "https://www.youtube.com/@graphicsMultimedia1122",
    label: "Youtube",
  },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [packagesDropdownOpen, setPackagesDropdownOpen] =
    useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      {/* Top Bar */}
      <div className="border-b border-border/60 bg-muted/40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-9">
            {/* Email */}
            <a
              href="mailto:graphicsmultimedia.net"
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail className="w-3.5 h-3.5 shrink-0" />
              <span>graphicsmultimedia.net</span>
            </a>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20 py-10 lg:py-0">
          {/* Logo */}
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

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => {
              if (item.dropdown) {
                return (
                  <div
                    key={item.href}
                    className="relative py-3"
                    onMouseEnter={() => setPackagesDropdownOpen(true)}
                    onMouseLeave={() =>
                      setPackagesDropdownOpen(false)
                    }
                  >
                    <button className="relative text-base tracking-wide opacity-60 hover:opacity-100 transition-opacity group flex items-center gap-1">
                      {item.label}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${packagesDropdownOpen ? "rotate-180" : ""}`}
                      />
                      <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300"></span>
                    </button>

                    {/* Dropdown Menu */}
                    {packagesDropdownOpen && (
                      <div className="absolute top-10 left-0 mt-2 w-48 bg-background border border-border rounded-md shadow-lg py-2 animate-in fade-in-0 zoom-in-95 z-9">
                        {item.dropdown.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.href}
                            href={dropdownItem.href}
                            className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                            onClick={() =>
                              setPackagesDropdownOpen(false)
                            }
                          >
                            {dropdownItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative text-base tracking-wide opacity-60 hover:opacity-100 transition-opacity group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300"></span>
                </Link>
              );
            })}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button asChild className="py-6 w-35 uppercase">
              <Link href="/packages/regular">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => {
                if (item.dropdown) {
                  return (
                    <div
                      key={item.href}
                      className="flex flex-col gap-2"
                    >
                      <div className="text-sm font-medium text-muted-foreground">
                        {item.label}
                      </div>
                      <div className="flex flex-col gap-2 pl-4">
                        {item.dropdown.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.href}
                            href={dropdownItem.href}
                            className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {dropdownItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Button
                asChild
                className="bg-primary hover:bg-primary/90 text-primary-foreground w-full mt-2"
              >
                <Link href="/packages/regular">Get Started</Link>
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
