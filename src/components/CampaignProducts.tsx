import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { Product, getCampaignProducts } from "../services/productService";
import { useToast } from "./ui/use-toast";

const CampaignProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchCampaignProducts = async () => {
      try {
        const campaignProducts = await getCampaignProducts();
        console.log('Fetched campaign products:', campaignProducts);
        setProducts(campaignProducts);
      } catch (error) {
        console.error('Error fetching campaign products:', error);
        toast({
          title: "Error",
          description: "Failed to load campaign products. Please try again later.",
          variant: "destructive",
        });
      }
    };

    fetchCampaignProducts();
  }, [toast]);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Produk Unggulan</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Temukan produk-produk terbaik kami untuk memenuhi kebutuhan rumah tangga Anda
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100"
            >
              <div className="relative h-64">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-primary">{product.price}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-sm border-primary text-primary hover:bg-primary hover:text-white"
                    onClick={() => window.open("https://store.cosmos.id", "_blank")}
                  >
                    Beli Sekarang
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CampaignProducts;