import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

const Contact = () => {
  const handleWhatsAppClick = () => {
    window.open("https://api.whatsapp.com/send/?phone=6281806267667&text=Hi%2CCosmos.&type=phone_number&app_absent=0", "_blank");
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <section className="py-20 bg-gray-50 pt-28">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-center mb-12"
          >
            Get in Touch
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="flex items-center space-x-4">
                <Mail className="w-6 h-6 text-secondary" />
                <span>contact@cosmos.id</span>
              </div>
              <div className="flex items-center space-x-4">
                <Phone className="w-6 h-6 text-secondary" />
                <span>+1 234 567 890</span>
              </div>
              <div className="flex items-center space-x-4">
                <MapPin className="w-6 h-6 text-secondary" />
                <span>123 Business Street, Tech City, TC 12345</span>
              </div>
              <Button
                onClick={handleWhatsAppClick}
                className="w-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-5 h-5" />
                Chat with Us on WhatsApp
              </Button>
            </motion.div>
            <motion.form
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-secondary"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-secondary"
              />
              <textarea
                placeholder="Your Message"
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-secondary"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-secondary hover:bg-secondary/90 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Send Message
              </button>
            </motion.form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;