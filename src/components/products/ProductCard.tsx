
import { Product } from "../../types/product";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import ProductDetail from "../ProductDetail";
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
    <div className="w-[308px] h-[476px] bg-white border border-[#E5E9EB] flex flex-col items-start">
      <div className="w-full h-[308px]">
        <img 
          src={getImageUrl()}
          alt={product.name}
          className="w-full h-full object-cover"
          onError={() => {
            console.log('Image failed to load:', product.images?.[0]);
            setImageError(true);
          }}
        />
      </div>
      
      <div className="w-full h-[168px] pt-3 pb-2 px-6 flex flex-col justify-end gap-3">
        <div className="w-full h-[48px] flex flex-col items-start">
          <div className="w-full text-[#344054] text-[14px] font-normal leading-5 tracking-[0.14px]">
            Nama Produk
          </div>
          <div className="w-full text-[#101828] text-[20px] font-semibold leading-7 tracking-[0.25px]">
            {product.price}
          </div>
        </div>
        
        <div className="w-full h-[88px] flex flex-col gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <button className="w-full h-10 px-4 py-2 bg-white border border-[#DDE2E4] rounded-[6px] flex items-center justify-center gap-1 hover:bg-gray-50">
                <Eye className="w-6 h-6 text-[#344054]" />
                <span className="text-[#344054] text-[14px] font-medium leading-5 tracking-[0.14px]">
                  Quick Look
                </span>
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <ProductDetail product={product} />
            </DialogContent>
          </Dialog>
          
          <button className="w-full h-10 px-4 py-2 rounded-[6px] flex items-center justify-center">
            <span className="text-[#203E8A] text-base font-medium leading-6 tracking-[0.18px]">
              Lihat Detail
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
