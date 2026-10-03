import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Videos from "./components/Videos";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import SocialBar from "./components/SocialBar";
import BackToTop from "./components/BackToTop";
import YouTubeSection from "./components/YouTubeSection";
import InstagramSection from "./components/InstagramSection";
import FacebookSection from "./components/FacebookSection";

function App() {
  return (
    <main className="min-h-screen bg-[#050806]">
      <Navbar />

      {/* Top Hero */}
      <Hero />

      {/* Main YouTube Content */}
      <Videos />

      <YouTubeSection />
      <InstagramSection />
      <FacebookSection />

      <Contact />
      <Footer />

      <SocialBar />

      <BackToTop />
    </main>
  );
}

export default App;