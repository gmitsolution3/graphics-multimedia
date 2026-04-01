import Hero from "@/components/Hero";
import dynamic from "next/dynamic";

const Services = dynamic(() => import("@/components/Services"), {
  loading: () => <div className="h-40" />, // skeleton space
});

const About = dynamic(() => import("@/components/About"));
const Team = dynamic(() => import("@/components/Team"));
const Portfolio = dynamic(() => import("@/components/Portfolio"));
const ContactUs = dynamic(() => import("@/components/ContactUs"));

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <Services />
      <About />
      <Team />
      <Portfolio />
      <ContactUs />
    </main>
  );
}