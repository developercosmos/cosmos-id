import { useQuery } from "@tanstack/react-query";
import { Product } from "../../../types/product";
import { SERVER_URL } from "../../../config/serverConfig";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { Button } from "../../ui/button";
import { Trash2, Pencil, Search, Filter } from "lucide-react";
import { useToast } from "../../ui/use-toast";
import { useState } from "react";
import { Input } from "../../ui/input";

interface ProductListProps {
  onEdit?: (product: Product) => void;
}

const ProductList = ({ onEdit }: ProductListProps) => {
  const { toast } = useToast();
  const [nameFilter, setNameFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const { data: products, refetch } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await fetch(`${SERVER_URL}/src/server/products.php`);
      const data = await response.json();
      if (!data.success) throw new Error(data.message);
      return data.data as Product[];
    },
  });

  const handleDelete = async (productId: number) => {
    try {
      const response = await fetch(`${SERVER_URL}/src/server/products.php`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: productId }),
      });

      const data = await response.json();
      
      if (data.success) {
        toast({
          title: "Success",
          description: "Product deleted successfully",
        });
        refetch();
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete product",
        variant: "destructive",
      });
    }
  };

  const filteredProducts = products?.filter(product => {
    const nameMatch = product.name.toLowerCase().includes(nameFilter.toLowerCase());
    const categoryMatch = product.category.toLowerCase().includes(categoryFilter.toLowerCase());
    return nameMatch && categoryMatch;
  });

  const getImageUrl = (product: Product) => {
    console.log('Processing image for product:', product.name);
    console.log('Product images array:', product.images);

    if (!product.images || product.images.length === 0) {
      console.log('No images found, using placeholder');
      return "/placeholder.svg";
    }

    const imageUrl = product.images[0];
    console.log('Raw image URL:', imageUrl);

    if (!imageUrl) {
      console.log('No image URL found, using placeholder');
      return "/placeholder.svg";
    }

    if (imageUrl.startsWith('http')) {
      console.log('Using absolute URL:', imageUrl);
      return imageUrl;
    }

    // Clean the image URL to ensure it only contains the filename
    const filename = imageUrl.split('/').pop();
    const fullUrl = `${SERVER_URL}/public/uploads/${filename}`;
    console.log('Constructed full URL:', fullUrl);
    return fullUrl;
  };

  if (!products) return <div>Loading...</div>;

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader className="bg-[#1A1F2C]">
          <TableRow>
            <TableHead className="text-white">Image</TableHead>
            <TableHead className="text-white">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span>Name</span>
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <Input
                  placeholder="Filter by name..."
                  value={nameFilter}
                  onChange={(e) => setNameFilter(e.target.value)}
                  className="h-8 w-full bg-white/10 text-white placeholder:text-gray-400"
                />
              </div>
            </TableHead>
            <TableHead className="text-white">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span>Category</span>
                  <Filter className="h-4 w-4 text-gray-400" />
                </div>
                <Input
                  placeholder="Filter by category..."
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="h-8 w-full bg-white/10 text-white placeholder:text-gray-400"
                />
              </div>
            </TableHead>
            <TableHead className="text-white">Price</TableHead>
            <TableHead className="text-right text-white">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProducts?.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <img
                  src={getImageUrl(product)}
                  alt={product.name}
                  className="w-12 h-12 object-cover rounded"
                  onError={(e) => {
                    console.log('Image failed to load:', getImageUrl(product));
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder.svg";
                  }}
                />
              </TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      console.log('Edit button clicked for product:', product);
                      if (onEdit) {
                        onEdit(product);
                      }
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDelete(product.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductList;