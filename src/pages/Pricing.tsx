
import Navbar from "@/components/Navbar";
import PricingDetails from "@/components/PricingDetails";
import Footer from "@/components/Footer";

const Pricing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <PricingDetails />
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
