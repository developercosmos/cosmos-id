import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useToast } from "../ui/use-toast";
import { SERVER_URL } from "../../config/serverConfig";
import ProductForm from "./products/ProductForm";
import { Product, ProductFormData } from "../../types/product";
import ProductList from "./products/ProductList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

const ProductsManager = () => {
  const { toast } = useToast();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState("list");

  const handleSubmit = async (form: ProductFormData) => {
    console.log("Submitting product:", form);
    
    try {
      const method = editingProduct ? 'PUT' : 'POST';
      const body = editingProduct ? { ...form, id: editingProduct.id } : form;
      
      console.log("Making request to:", `${SERVER_URL}/src/server/products.php`);
      console.log("Request body:", body);
      
      const response = await fetch(`${SERVER_URL}/src/server/products.php`, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error(editingProduct ? 'Failed to update product' : 'Failed to save product');
      }

      const data = await response.json();
      console.log('Product saved successfully:', data);
      
      toast({
        title: "Success",
        description: editingProduct ? "Product updated successfully" : "Product saved successfully",
      });

      // Reset form and go back to list
      setEditingProduct(null);
      setActiveTab("list");
    } catch (error) {
      console.error('Error saving product:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save product. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (product: Product) => {
    console.log("Editing product:", product);
    if (!product) {
      console.error("No product provided to edit");
      return;
    }
    setEditingProduct(product);
    setActiveTab("add");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Management</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="list">Product List</TabsTrigger>
            <TabsTrigger value="add">{editingProduct ? 'Edit Product' : 'Add New Product'}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="list">
            <ProductList onEdit={handleEdit} />
          </TabsContent>
          
          <TabsContent value="add">
            <ProductForm 
              onSubmit={handleSubmit} 
              initialForm={editingProduct || undefined}
              onCancel={() => {
                setEditingProduct(null);
                setActiveTab("list");
              }}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ProductsManager;