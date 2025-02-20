
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
    <div className="min-h-screen bg-white relative">
      <Navbar />
      
      {/* Hero Section - matches v79_197 and related classes */}
      <div className="relative h-[560px] w-full mt-[120px]">
        <div className="absolute inset-0 bg-[#D9D9D9]" /> {/* v85_501 */}
        <img 
          src="/lovable-uploads/06ea0975-8f44-4a43-b331-55edbc1b4ccb.png"
          alt="Kitchen Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <h1 className="text-[72px] font-normal text-white font-inter">Kitchen</h1>
        </div>
      </div>

      {/* Main Content Section - matches v82_328 */}
      <div className="container mx-auto px-5 py-8 mt-[120px]">
        {/* Breadcrumb - matches v89_828 */}
        <div className="flex items-center text-sm mb-6">
          <span className="text-[#344054] font-medium">Home</span>
          <span className="mx-2 text-[#344054] font-medium">/</span>
          <span className="text-[#98A2B3] font-medium">Semua Kitchen</span>
        </div>

        {/* Results and Sort Section - matches v83_498 */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold text-[#242C31]">{products.length} Ditemukan</h2>
          <div className="flex items-center">
            <span className="text-[#9AA6AC] mr-2">Sort by:</span>
            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger className="w-[178px] bg-white border rounded-[6px] text-[#242C31]">
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

        {/* Products Grid */}
        <div className="mb-16">
          <ProductGrid products={products} />
        </div>

        {/* Load More Button - matches v109_982 */}
        <div className="flex justify-center mb-16">
          <button className="px-4 py-2 bg-white text-[#344054] font-medium text-sm border rounded-[6px] hover:bg-gray-50">
            Load More Products
          </button>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-red-600 py-8">
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
