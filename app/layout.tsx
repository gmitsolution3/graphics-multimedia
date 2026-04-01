import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
  weight: [
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900",
  ],
  variable: "--font-poppins",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Graphics Multimedia | Developed by GM IT Solution",
  description: "Strategic digital solutions for modern brands.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <link rel="preload" as="image" href="/images/marketing.jpg" />
      <link rel="preload" as="image" href="/images/graphics_design.jpg" />
      <link rel="preload" as="image" href="/images/video_editing.jpg" />

      <body className={`${poppins.className} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
