import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "../components/ui/use-toast";
import { Product, getProductsByCategory } from "../services/productService";
import ProductGrid from "../components/products/ProductGrid";

const Products = () => {
  const [kitchenProducts, setKitchenProducts] = useState<Product[]>([]);
  const [homeProducts, setHomeProducts] = useState<Product[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const kitchen = await getProductsByCategory('Kitchen Appliances');
        const home = await getProductsByCategory('Home Appliances');
        
        console.log('Fetched kitchen products:', kitchen);
        console.log('Fetched home products:', home);
        
        setKitchenProducts(kitchen);
        setHomeProducts(home);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast({
          title: "Error",
          description: "Failed to load products. Please try again later.",
          variant: "destructive",
        });
      }
    };

    fetchProducts();
  }, [toast]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto pt-24 px-4 pb-16">
        <h1 className="text-4xl font-bold text-center mb-2">Our Products</h1>
        <p className="text-gray-600 text-center mb-8">
          Discover our range of high-quality home and kitchen appliances
        </p>
        
        <Tabs defaultValue="kitchen" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="kitchen">Kitchen Appliances</TabsTrigger>
            <TabsTrigger value="home">Home Appliances</TabsTrigger>
          </TabsList>
          
          <TabsContent value="kitchen">
            <ProductGrid products={kitchenProducts} />
          </TabsContent>
          
          <TabsContent value="home">
            <ProductGrid products={homeProducts} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Products;