
import Navbar from "../components/Navbar";
import VideoSlider from "../components/VideoSlider";
import Footer from "../components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-white relative">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>
      <VideoSlider />
      <Footer />
    </main>
  );
};

export default Index;
