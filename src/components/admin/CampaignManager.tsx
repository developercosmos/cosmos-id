import { useState } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { useToast } from "../ui/use-toast";
import { SERVER_URL } from "../../config/serverConfig";

interface CampaignProduct {
  name: string;
  description: string;
  price: string;
  image: string;
}

const initialProduct: CampaignProduct = {
  name: "",
  description: "",
  price: "",
  image: "",
};

const CampaignManager = () => {
  const [products, setProducts] = useState<CampaignProduct[]>([]);
  const [currentProduct, setCurrentProduct] = useState<CampaignProduct>(initialProduct);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Adding campaign product:", currentProduct);

    try {
      console.log("Making request to:", `${SERVER_URL}/src/server/campaign.php`);
      const response = await fetch(`${SERVER_URL}/src/server/campaign.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentProduct),
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to save campaign product');
      }

      const data = await response.json();
      console.log('Campaign product saved:', data);
      
      setProducts(prev => [...prev, currentProduct]);
      setCurrentProduct(initialProduct);
      
      toast({
        title: "Success",
        description: "Campaign product saved successfully",
      });
    } catch (error) {
      console.error('Error saving campaign product:', error);
      toast({
        title: "Error",
        description: "Failed to save campaign product. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Campaign Products</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              value={currentProduct.name}
              onChange={(e) => setCurrentProduct(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={currentProduct.description}
              onChange={(e) => setCurrentProduct(prev => ({ ...prev, description: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              value={currentProduct.price}
              onChange={(e) => setCurrentProduct(prev => ({ ...prev, price: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              value={currentProduct.image}
              onChange={(e) => setCurrentProduct(prev => ({ ...prev, image: e.target.value }))}
            />
          </div>

          <Button type="submit">Add Campaign Product</Button>
        </form>

        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Current Campaign Products</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {products.map((product, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <h4 className="font-semibold">{product.name}</h4>
                  <p className="text-sm text-gray-600">{product.description}</p>
                  <p className="text-primary font-bold mt-2">{product.price}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CampaignManager;