import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Awards = () => {
  const awards = [
    {
      image: "/lovable-uploads/21dbcc70-f063-4b4d-868f-91688ac39e18.png",
      alt: "Top 250 Indonesia Original Brands"
    },
    {
      image: "/lovable-uploads/b259fde2-b8e1-43b6-84c6-0e3108840672.png",
      alt: "Top Brand"
    },
    {
      image: "/lovable-uploads/74a679b8-bac4-49d8-a9cf-93b9f89e4b96.png",
      alt: "Indonesia Good Design"
    },
    {
      image: "/lovable-uploads/0af698e7-123a-4dc1-9c0d-9b5b80374b0f.png",
      alt: "Superbrands Indonesia"
    },
    {
      image: "/lovable-uploads/43efd89a-bcf3-41f9-b9d1-5a305bfd1e07.png",
      alt: "Indonesia Brand Champion"
    },
    {
      image: "/lovable-uploads/4aa51a17-c4f4-426d-914d-c1e6b656ebb8.png",
      alt: "Satria Brand Award"
    },
    {
      image: "/lovable-uploads/42c7ecd0-4323-444c-a0d5-374d9404a16e.png",
      alt: "Gold Award"
    }
  ];

  return (
    <div className="py-8 px-4 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <Carousel className="w-full max-w-xs mx-auto md:max-w-2xl">
          <CarouselContent>
            {awards.map((award, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <img
                    src={award.image}
                    alt={award.alt}
                    className="w-full h-auto object-contain"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </motion.div>
    </div>
  );
};

export default Awards;