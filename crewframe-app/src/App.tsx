import Loader from "./components/Loader/Loader";
import CursorFx from "./components/CursorFx/CursorFx";
import ScrollTop from "./components/ScrollTop/ScrollTop";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Loop from "./components/Loop/Loop";
import About from "./components/About/About";
import Services from "./components/Services/Services";
import Work from "./components/Work/Work";
import Why from "./components/Why/Why";
import Crew from "./components/Crew/Crew";
import Pricing from "./components/Pricing/Pricing";
import Testimonials from "./components/Testimonials/Testimonials";
import FAQ from "./components/FAQ/FAQ";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";

export default function App() {
  return (
    <>
      <Loader />
      <CursorFx />
      <ScrollTop />
      <Navbar />
      <main>
        <Hero />
        <Loop />
        <About />
        <Services />
        <Work />
        <Why />
        <Crew />
        <Pricing />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
