
import { Product } from "../types/product";
import { X } from "lucide-react";
import { DialogClose } from "./ui/dialog";
import { useState } from "react";
import { SERVER_URL } from "../config/serverConfig";

interface ProductDetailProps {
  product: Product;
}

const ProductDetail = ({ product }: ProductDetailProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [imageError, setImageError] = useState<{ [key: string]: boolean }>({});

  const getFallbackImage = () => {
    return "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=500";
  };

  const getImageUrl = (imageUrl: string, isThumb: boolean = false) => {
    if (imageError[imageUrl] || !imageUrl) {
      return getFallbackImage();
    }
    
    // If it's already a full URL, return it as is
    if (imageUrl.startsWith('http')) {
      return imageUrl;
    }

    // Clean the image URL to ensure it only contains the filename
    const filename = imageUrl.split('/').pop();
    return `${SERVER_URL}/public/uploads/${filename}`;
  };

  const handleImageError = (imageUrl: string) => {
    setImageError(prev => ({
      ...prev,
      [imageUrl]: true
    }));
    console.log(`Image failed to load: ${imageUrl}`);
  };

  return (
    <div className="w-[1024px] pt-6 pb-14 px-8 pr-6 bg-white rounded-3xl">
      <div className="flex justify-end">
        <DialogClose className="relative">
          <X className="w-8 h-8 text-[#101828]" />
        </DialogClose>
      </div>

      <div className="flex gap-8">
        {/* Left side - Images */}
        <div className="flex-1 flex flex-col gap-3">
          <div className="h-[468px] bg-[#D9D9D9] rounded-xl overflow-hidden">
            <img
              src={getImageUrl(product.images[selectedImage])}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={() => handleImageError(product.images[selectedImage])}
            />
          </div>
          <div className="flex gap-3">
            {product.images.map((image, index) => (
              <button
                key={index}
                className={`flex-1 h-[108px] bg-[#D9D9D9] rounded-lg overflow-hidden transition-all ${
                  selectedImage === index ? 'border-2 border-[#18181B] ring-1 ring-[#18181B]' : 'hover:opacity-80'
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <img
                  src={getImageUrl(image)}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={() => handleImageError(image)}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right side - Product Details */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="h-9">
            <h2 className="text-[32px] text-[#101828] font-semibold leading-9 tracking-[0.6px]">
              {product.name}
            </h2>
          </div>

          {/* Features */}
          <div className="p-4 bg-[#F7F7F7] flex flex-col gap-3">
            {product.features.map((feature, index) => (
              <div key={index} className="flex gap-1">
                <span className="text-[#344054] text-sm">•</span>
                <span className="flex-1 text-[#344054] text-sm leading-5 tracking-[0.14px]">
                  {feature}
                </span>
              </div>
            ))}
          </div>

          {/* What's in the Box */}
          <div className="p-4 pt-3 pb-3 bg-[#F7F7F7] flex flex-col">
            {product.whatsInTheBox.map((item, index) => (
              <div 
                key={index}
                className="py-2 flex gap-1 border-b border-black last:border-b-0"
              >
                <span className="w-[136px] text-[#344054] text-sm leading-5 tracking-[0.14px]">
                  {item.split(':')[0]}
                </span>
                <span className="text-[#101828] text-sm font-bold leading-5 tracking-[0.14px]">
                  {item.split(':')[1]}
                </span>
              </div>
            ))}
          </div>

          {/* Buy Now Button */}
          <div className="h-12">
            <button className="w-full h-full bg-[#DC2626] text-white font-semibold rounded-md hover:bg-red-700 transition-colors">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
