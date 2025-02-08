import { motion } from "framer-motion";

const About = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Tentang Cosmos</h2>
            <p className="text-gray-600 mb-4">
              Cosmos adalah salah satu merk elektronik rumah tangga Indonesia pertama yang memegang
              teguh komitmen terhadap standar tinggi dalam teknologi dan kualitas.
            </p>
            <p className="text-gray-600 mb-6">
              Dibawah naungan PT. Star Cosmos, produk-produk Cosmos dirancang dan diproduksi untuk
              selalu menjadi inovator dan pelopor dalam industri produk perlengkapan rumah tangga.
            </p>
            <p className="text-gray-600 mb-6">
              Sejak tahun 1976, Cosmos telah menjadi bagian dari keluarga Indonesia dan selalu berinovasi
              menghadirkan produk yang memenuhi kebutuhan gaya hidup sehat para keluarga Indonesia.
            </p>
            <button className="bg-secondary hover:bg-secondary/90 text-white px-6 py-2 rounded-lg transition-colors">
              Selengkapnya
            </button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative h-[400px] rounded-lg overflow-hidden"
          >
            <img
              src="/lovable-uploads/372014ce-1318-4020-bce6-260083c23cc1.png"
              alt="Cosmos Building"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;