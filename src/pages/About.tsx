
import Navbar from "@/components/Navbar";
import About from "@/components/About";
import MedicalDirector from "@/components/MedicalDirector";
import Footer from "@/components/Footer";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <About />
        <div className="container mx-auto px-4">
          <MedicalDirector />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
