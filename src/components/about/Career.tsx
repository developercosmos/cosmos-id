import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const Career = () => {
  return (
    <div className="py-8 px-4 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="text-2xl font-bold mb-6">Join Our Team</h2>
        <Button
          onClick={() => window.open("https://recruitment.cosmos.id/", "_blank")}
          className="inline-flex items-center gap-2"
        >
          Visit Our Recruitment Website
          <ExternalLink className="w-4 h-4" />
        </Button>
      </motion.div>
    </div>
  );
};

export default Career;