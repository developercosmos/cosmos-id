
import { Product } from "../../types/product";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
  
  const getFallbackImage = () => {
    return "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=500";
  };

  const getImageUrl = () => {
    if (imageError || !product.images || !product.images[0]) {
      return getFallbackImage();
    }
    return product.images[0];
  };

  return (
    <Card className="hover:shadow-lg transition-shadow border-0">
      <CardHeader className="text-center p-0">
        <div className="relative group cursor-pointer">
          <img 
            src={getImageUrl()}
            alt={product.name}
            className="w-full aspect-square object-cover"
            onError={() => {
              console.log('Image failed to load:', product.images?.[0]);
              setImageError(true);
            }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-2">
          <p className="text-gray-500 text-sm">Nama Produk</p>
          <h3 className="font-semibold text-lg">{product.name}</h3>
          <p className="text-gray-900">{product.price}</p>
          
          <div className="flex space-x-2 pt-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="flex-1">
                  Quick Look
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <ProductDetail product={product} />
              </DialogContent>
            </Dialog>
            <Button variant="outline" size="sm" className="flex-1">
              Lihat Detail
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
