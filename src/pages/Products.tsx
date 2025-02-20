
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useToast } from "../components/ui/use-toast";
import { Product, getProductsByCategory } from "../services/productService";
import ProductGrid from "../components/products/ProductGrid";
import Footer from "../components/Footer";
import { Input } from "../components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

const Products = () => {
  const [kitchenProducts, setKitchenProducts] = useState<Product[]>([]);
  const [homeProducts, setHomeProducts] = useState<Product[]>([]);
  const [sortOption, setSortOption] = useState("Featured");
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

  // Currently showing kitchen products as per the Figma design
  const products = kitchenProducts;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-[400px] w-full">
        <img 
          src="/lovable-uploads/06ea0975-8f44-4a43-b331-55edbc1b4ccb.png"
          alt="Kitchen Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <h1 className="text-6xl font-bold text-white">Kitchen</h1>
        </div>
      </div>

      {/* Breadcrumb and Results */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col space-y-4">
          {/* Breadcrumb */}
          <div className="flex items-center text-sm text-gray-500">
            <span>Home</span>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Semua Kitchen</span>
          </div>

          {/* Results and Sort */}
          <div className="flex justify-between items-center">
            <p className="text-gray-600">{products.length} Ditemukan</p>
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">Sort by:</span>
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Featured">Featured</SelectItem>
                  <SelectItem value="Newest">Newest</SelectItem>
                  <SelectItem value="Price: Low to High">Price: Low to High</SelectItem>
                  <SelectItem value="Price: High to Low">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="mt-8">
          <ProductGrid products={products} />
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-red-600 py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-white font-semibold">Newsletter</h3>
              <p className="text-white text-sm">
                Jadilah yang pertama mengetahui seputar diskon, penawaran dan event kami!
              </p>
            </div>
            <div className="flex w-full md:w-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="rounded-r-none"
              />
              <button className="px-6 py-2 bg-gray-900 text-white rounded-r">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Products;
