import { motion } from "framer-motion";
import { 
  Beef, // for blender/food processor
  Coffee, 
  Fan, 
  Refrigerator,
  Tv,
  Smartphone,
  Waves,
  Utensils,
  Flame,
  ChefHat // for rice cooker
} from "lucide-react";

const services = [
  {
    icon: <Beef className="w-12 h-12 mb-4" />,
    title: "Blender",
    description: "Blender dan peralatan dapur",
  },
  {
    icon: <Utensils className="w-12 h-12 mb-4" />,
    title: "Cooking Ware",
    description: "Peralatan memasak",
  },
  {
    icon: <Flame className="w-12 h-12 mb-4" />,
    title: "Gas Cooker",
    description: "Kompor gas berkualitas",
  },
  {
    icon: <ChefHat className="w-12 h-12 mb-4" />,
    title: "Rice Cooker",
    description: "Rice cooker dan magic com",
  },
  {
    icon: <Coffee className="w-12 h-12 mb-4" />,
    title: "Coffee Maker",
    description: "Pembuat kopi otomatis",
  },
  {
    icon: <Fan className="w-12 h-12 mb-4" />,
    title: "Air Cooler & Fan",
    description: "Pendingin dan kipas angin",
  },
];

const Services = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Kategori Produk</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Temukan berbagai produk elektronik rumah tangga berkualitas untuk kebutuhan keluarga Anda
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow cursor-pointer"
            >
              <div className="text-secondary">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
