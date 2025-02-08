import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-b from-primary/10 to-primary/5 text-gray-900 pt-20">
      <div className="container mx-auto px-4 py-16 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold mb-6"
        >
          Inovasi untuk Keluarga Indonesia
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl mb-8 text-gray-600 max-w-2xl mx-auto"
        >
          Sejak 1976, Cosmos telah menjadi bagian dari keluarga Indonesia dengan produk elektronik rumah tangga berkualitas
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            variant="default"
            size="lg"
            className="text-lg bg-primary hover:bg-primary/90"
            onClick={() => window.open("https://store.cosmos.id", "_blank")}
          >
            Official Store
            <ArrowRight className="ml-2" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="text-lg border-primary text-primary hover:bg-primary hover:text-white"
            onClick={() => window.location.href = '/products'}
          >
            Lihat Produk
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;