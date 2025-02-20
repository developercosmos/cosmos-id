
import Navbar from "../components/Navbar";
import VideoSlider from "../components/VideoSlider";
import Footer from "../components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-20">
        <VideoSlider />
      </div>
      <Footer />
    </main>
  );
};

export default Index;
