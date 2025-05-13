import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Testimonials from "@/components/sections/Testimonials";
import RecentWork from "@/components/sections/RecentWork";
import ServicesGrid from "@/components/sections/ServicesGrid";
import TestimonialsSecondary from "@/components/sections/TestimonialsSecondary";
import ContactForm from "@/components/sections/ContactForm";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-14">
        <Hero />
        <Services />
        <Testimonials />
        <RecentWork />
        <TestimonialsSecondary />
        <ServicesGrid />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
