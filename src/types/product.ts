export interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  price: string;
  features: string[];
  whatsInTheBox: string[];
  warranty: string;
  manual: string;
  images: string[];
}

export interface ProductFormData {
  name: string;
  description: string;
  category: string;
  price: string;
  features: string[];
  whatsInTheBox: string[];
  warranty: string;
  manual: string;
  images: string[];
}