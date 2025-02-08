import { useState } from "react";
import { Button } from "../../ui/button";
import { ProductFormData } from "../../../types/product";
import { ImageUpload } from "./ImageUpload";
import { BasicInfo } from "./form-sections/BasicInfo";
import { Features } from "./form-sections/Features";
import { BoxContents } from "./form-sections/BoxContents";
import { Documentation } from "./form-sections/Documentation";

interface ProductFormProps {
  onSubmit: (form: ProductFormData) => void;
  initialForm?: ProductFormData;
  onCancel?: () => void;
}

const ProductForm = ({ onSubmit, initialForm, onCancel }: ProductFormProps) => {
  const [form, setForm] = useState<ProductFormData>(
    initialForm || {
      name: "",
      description: "",
      category: "",
      price: "",
      features: [""],
      whatsInTheBox: [""],
      warranty: "",
      manual: "",
      images: [],
    }
  );

  const handleImageUpload = (imageUrl: string) => {
    setForm(prev => ({
      ...prev,
      images: [...prev.images, imageUrl]
    }));
  };

  const handleImageDelete = (imageUrl: string) => {
    setForm(prev => ({
      ...prev,
      images: prev.images.filter(img => img !== imageUrl)
    }));
  };

  const updateForm = (updates: Partial<ProductFormData>) => {
    setForm(prev => ({ ...prev, ...updates }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <BasicInfo form={form} onUpdate={updateForm} />
      
      <ImageUpload 
        onUpload={handleImageUpload} 
        existingImages={form.images}
        onDelete={handleImageDelete}
      />
      
      <Features 
        features={form.features} 
        onChange={(features) => updateForm({ features })} 
      />
      
      <BoxContents 
        items={form.whatsInTheBox} 
        onChange={(items) => updateForm({ whatsInTheBox: items })} 
      />
      
      <Documentation 
        warranty={form.warranty}
        manual={form.manual}
        onUpdate={updateForm}
      />

      <div className="flex gap-4">
        <Button type="submit">
          {initialForm ? 'Update Product' : 'Save Product'}
        </Button>
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
};

export default ProductForm;