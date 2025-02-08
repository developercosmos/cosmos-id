import { Product } from "../../types/product";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ProductDetail from "../ProductDetail";
import { getIconForProduct } from "../../utils/productIcons";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [imageError, setImageError] = useState(false);
  
  // Function to get a fallback image URL
  const getFallbackImage = () => {
    return "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=500";
  };

  // Function to handle image URL
  const getImageUrl = () => {
    if (imageError || !product.images || !product.images[0]) {
      return getFallbackImage();
    }
    return product.images[0];
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          {!imageError ? (
            <img 
              src={getImageUrl()}
              alt={product.name}
              className="w-48 h-48 object-contain"
              onError={() => {
                console.log('Image failed to load:', product.images?.[0]);
                setImageError(true);
              }}
            />
          ) : (
            <div className="flex justify-center items-center w-48 h-48 bg-gray-100 text-gray-400">
              {getIconForProduct(product.name)}
            </div>
          )}
        </div>
        <CardTitle className="text-xl">{product.name}</CardTitle>
        <CardDescription className="text-primary font-semibold">
          {product.price}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <div className="space-y-2">
          <h4 className="font-semibold">Features:</h4>
          <ul className="list-disc list-inside text-sm text-gray-600">
            {product.features.slice(0, 3).map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
        <div className="mt-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full">
                View Details
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <ProductDetail product={product} />
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;