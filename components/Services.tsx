import { Card, CardContent } from "@/components/ui/card";
import {
  Layout,
  Figma,
  Film,
  Scissors,
  Box,
  Video,
  TrendingUp,
  Droplet,
  Sparkles,
} from "lucide-react";

/* const services = [
  {
    icon: Share2,
    title: "Digital Marketing",
    description:
      "Build your brand presence and engage your audience across all social platforms.",
  },
  {
    icon: Globe,
    title: "Web Development",
    description:
      "Build stunning, high-performance websites that convert visitors into customers.",
  },
  {
    icon: Figma,
    title: "UI/UX Design",
    description:
      "Create stunning, impactful designs that elevate your brand and captivate your audience.",
  },
  {
    icon: Video,
    title: "Video Editing",
    description:
      "Produce dynamic, professional videos that boost visibility and connect with your audience.",
  },
  {
    icon: Palette,
    title: "Branding & Graphics",
    description:
      "Build a strong, memorable brand identity with strategic visuals that leave a lasting impression.",
  },
  {
    icon: Cog,
    title: "Business Automation",
    description:
      "Streamline operations with smart automation solutions that save time and boost productivity.",
  },
]; */

const services = [
  {
    icon: Layout,
    title: "UI & UX Design",
    description:
      "Design intuitive, user-centered interfaces that enhance experience and drive engagement.",
  },
  {
    icon: Figma,
    title: "Graphic Design",
    description:
      "Create visually compelling designs that communicate your brand message with impact.",
  },
  {
    icon: Film,
    title: "Motion Graphics Design",
    description:
      "Produce dynamic motion visuals that capture attention and elevate your storytelling.",
  },
  {
    icon: Scissors,
    title: "Rotoscoping",
    description:
      "Deliver precise frame-by-frame masking for seamless visual effects and clean composites.",
  },
  {
    icon: Box,
    title: "2D/3D Animation",
    description:
      "Create immersive 2D and 3D animations that bring ideas to life with stunning visual impact.",
  },
  {
    icon: Video,
    title: "Video Editing",
    description:
      "Craft professional, engaging videos that tell powerful stories and inspire action.",
  },
  {
    icon: TrendingUp,
    title: "Digital Marketing",
    description:
      "Drive targeted traffic and measurable growth with data-driven marketing strategies.",
  },
  {
    icon: Droplet,
    title: "Color Grading",
    description:
      "Enhance visuals with cinematic color tones that create mood and visual consistency.",
  },
  {
    icon: Sparkles,
    title: "Visual Effects",
    description:
      "Create stunning visual effects that bring imagination to life with cinematic precision.",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 lg:py-28">
      <div className="container mx-auto px-4">
        {/* Minimal Section Header */}
        <div className="max-w-3xl mx-auto mb-16 lg:mb-20 text-center">
          <div className="inline-block">
            <div className="w-12 h-0.5 bg-primary mx-auto mb-6"></div>
          </div>
          <h2 className="text-3xl lg:text-4xl font-light tracking-tight mb-5">
            Expertise that delivers
          </h2>
          <p className="text-base lg:text-lg max-w-2xl mx-auto leading-relaxed opacity-70">
            Strategic solutions crafted for measurable business
            impact.
          </p>
        </div>

        {/* Clean Grid Layout */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-card p-8 lg:p-10 group relative overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Hover background effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

              {/* Corner accent on hover */}
              <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden">
                <div className="absolute top-0 right-0 w-12 h-12 bg-primary/10 -rotate-45 translate-x-6 -translate-y-6 group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform duration-500"></div>
              </div>

              <div className="relative z-10">
                <div className="mb-7 transform group-hover:scale-110 group-hover:translate-x-1 transition-transform duration-300">
                  <service.icon className="w-8 h-8 text-primary opacity-80 group-hover:opacity-100" />
                </div>

                <h3 className="text-lg font-medium mb-3 tracking-tight group-hover:translate-x-1 transition-transform duration-300">
                  {service.title}
                </h3>

                <p className="text-sm leading-relaxed opacity-60 group-hover:opacity-80 transition-opacity duration-300">
                  {service.description}
                </p>

                {/* Subtle accent line with hover effect */}
                <div className="w-8 h-0.5 bg-primary opacity-30 mt-6 group-hover:w-12 group-hover:opacity-60 transition-all duration-300"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Optional bottom accent */}
        <div className="text-center mt-12">
          <span className="text-xs tracking-[0.3em] uppercase opacity-40">
            Integrated solutions
          </span>
        </div>
      </div>
    </section>
  );
}
