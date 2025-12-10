import { Navbar } from "@/components/v1/navbar";
import { Hero } from "@/components/v1/hero";
import { BrandsMarquee } from "@/components/v1/brands";
import { Services } from "@/components/v1/services";
import { Comparison } from "@/components/v1/comparison";
import { Work } from "@/components/v1/work";
import { About } from "@/components/v1/about";
import { Process } from "@/components/v1/process";
import { Pricing } from "@/components/v1/pricing";
import { Testimonials } from "@/components/v1/testimonials";
import { FAQ } from "@/components/v1/faq";
import { Contact } from "@/components/v1/contact";
import { Footer } from "@/components/v1/footer";
 

export default function Home() {
  return (
    <main className="bg-black min-h-screen text-white selection:bg-blue-500/30">
      <Navbar />
      <Hero />
      <BrandsMarquee />
      <Services />
      <Comparison />
      <Work />
      <About />
      <Process />
      <Pricing />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
