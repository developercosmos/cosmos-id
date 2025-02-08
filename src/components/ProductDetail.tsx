import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "./ui/button";
import { FileDown } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ProductDetailProps {
  product: {
    name: string;
    description: string;
    features: string[];
    whatsInTheBox: string[];
    warranty: string;
    manual: string;
    images: string[];
  };
}

const ProductDetail = ({ product }: ProductDetailProps) => {
  return (
    <div className="container mx-auto px-4 py-8">
      {product.images && product.images.length > 0 && (
        <div className="mb-8">
          <Carousel className="w-full max-w-xl mx-auto">
            <CarouselContent>
              {product.images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <div className="aspect-square relative overflow-hidden rounded-xl">
                      <img
                        src={image}
                        alt={`${product.name} - Image ${index + 1}`}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      )}

      <h1 className="text-3xl font-bold mb-6">{product.name}</h1>
      <p className="text-gray-600 mb-8">{product.description}</p>

      <Tabs defaultValue="features" className="w-full">
        <TabsList>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="whatsInTheBox">What's in the box</TabsTrigger>
          <TabsTrigger value="warranty">Warranty</TabsTrigger>
          <TabsTrigger value="manual">Manual</TabsTrigger>
        </TabsList>

        <TabsContent value="features">
          <ul className="list-disc pl-6 space-y-2">
            {product.features.map((feature, index) => (
              <li key={index} className="text-gray-700">{feature}</li>
            ))}
          </ul>
        </TabsContent>

        <TabsContent value="whatsInTheBox">
          <ul className="list-disc pl-6 space-y-2">
            {product.whatsInTheBox.map((item, index) => (
              <li key={index} className="text-gray-700">{item}</li>
            ))}
          </ul>
        </TabsContent>

        <TabsContent value="warranty">
          <div className="prose max-w-none">
            {product.warranty}
          </div>
        </TabsContent>

        <TabsContent value="manual">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <span>Download User Manual</span>
            <Button
              variant="outline"
              onClick={() => window.open(product.manual, "_blank")}
            >
              <FileDown className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductDetail;