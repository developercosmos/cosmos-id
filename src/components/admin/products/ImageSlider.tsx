
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "../../ui/button";
import { Trash2 } from "lucide-react";
import { SERVER_URL } from "../../../config/serverConfig";

interface ImageSliderProps {
  images: string[];
  onDelete?: (imageUrl: string) => void;
}

export const ImageSlider = ({ images, onDelete }: ImageSliderProps) => {
  if (!images.length) return null;

  const getImageUrl = (path: string) => {
    if (path.startsWith('http')) return path;
    return `${SERVER_URL}/public/uploads/${path.split('/').pop()}`;
  };

  return (
    <Carousel className="w-full max-w-xl mx-auto">
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <div className="aspect-square relative overflow-hidden rounded-xl group">
                <img
                  src={getImageUrl(image)}
                  alt={`Product image ${index + 1}`}
                  className="object-cover w-full h-full"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder.svg';
                    console.error(`Error loading image: ${image}`);
                  }}
                />
                {onDelete && (
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => onDelete(image)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
