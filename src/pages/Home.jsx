import Footer from "../components/Footer";
import CallToAction from "../components/Home/CallToAction";
import Features from "../components/Home/Features";
import Hero from "../components/Home/Hero";
import Testimonials from "../components/Home/Testimonials";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Features />
      <Testimonials />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Home;
