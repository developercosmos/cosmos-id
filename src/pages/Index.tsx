import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-16 bg-gradient-to-r from-cosmos-blue to-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to PT Star Cosmos
            </h1>
            <p className="text-xl mb-8">
              Leading innovation in electronics and home appliances
            </p>
            <Button
              size="lg"
              className="bg-cosmos-red hover:bg-red-700 text-white"
            >
              Explore Our Products
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-cosmos-gray">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-cosmos-blue">
                Quality Products
              </h3>
              <p className="text-cosmos-text">
                We deliver high-quality electronics and appliances that enhance your daily life.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-cosmos-blue">
                Innovation
              </h3>
              <p className="text-cosmos-text">
                Staying ahead with the latest technology and innovative solutions.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-cosmos-blue">
                Customer Service
              </h3>
              <p className="text-cosmos-text">
                Dedicated support team ensuring your satisfaction at every step.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-cosmos-blue">
              About PT Star Cosmos
            </h2>
            <p className="text-lg mb-8 text-cosmos-text">
              With years of experience in the industry, PT Star Cosmos has become
              a trusted name in electronics and home appliances. Our commitment
              to quality and innovation drives us to deliver exceptional products
              that improve people's lives.
            </p>
            <Button variant="outline" className="text-cosmos-blue border-cosmos-blue">
              Learn More About Us
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;