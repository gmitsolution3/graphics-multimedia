import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Team from "@/components/Team";
import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/Testimonials";
import ContactUs from "@/components/ContactUs"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <Services />
      <About />
      <Team />
      <Portfolio />
      <Testimonials />
      <ContactUs />
    </main>
  );
}
