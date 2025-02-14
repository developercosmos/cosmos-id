
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SERVER_URL } from "@/config/serverConfig";

interface WarrantyFormProps {
  initialData: {
    productFamily: string;
    model: string;
    storeName: string;
  };
  onSubmit: (formData: any) => void;
  provinces: any[];
}

export const WarrantyForm = ({ initialData, onSubmit, provinces }: WarrantyFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    ...initialData,
    fullName: "",
    phone: "",
    email: "",
    address: "",
    province: "",
    city: "",
    postalCode: "",
    purchaseDate: "",
    receipt: null as File | null,
  });
  const [cities, setCities] = useState([]);
  const [isPostalValid, setIsPostalValid] = useState(false);

  const handleProvinceChange = async (province: string) => {
    try {
      const response = await fetch(`${SERVER_URL}/api/PRO/Index`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          d: [{
            prov: province,
          }],
          i: "364D1BAD-327D-11EB-B811-0206859B6046"
        })
      });
      const data = await response.json();
      setCities(data);
      setFormData(prev => ({ ...prev, province, city: "" }));
    } catch (error) {
      console.error('Error fetching cities:', error);
      toast({
        title: "Error",
        description: "Failed to fetch cities",
        variant: "destructive",
      });
    }
  };

  const validatePostalCode = async (postalCode: string) => {
    if (postalCode.length !== 5) return;

    try {
      const response = await fetch(`${SERVER_URL}/api/QA/Index`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          d: [{
            postal: postalCode,
          }],
          i: "1752FF8C-327D-11EB-B811-0206859B6046"
        })
      });
      const data = await response.json();
      setIsPostalValid(data[0].return_type !== "Error");
    } catch (error) {
      console.error('Error validating postal code:', error);
      setIsPostalValid(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, receipt: e.target.files![0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPostalValid) {
      toast({
        title: "Invalid Postal Code",
        description: "Please enter a valid postal code",
        variant: "destructive",
      });
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="fullName">Full Name</Label>
        <Input
          id="fullName"
          value={formData.fullName}
          onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="province">Province</Label>
        <Select
          value={formData.province}
          onValueChange={handleProvinceChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select province" />
          </SelectTrigger>
          <SelectContent>
            {provinces.map((province) => (
              <SelectItem key={province.provinsi} value={province.provinsi}>
                {province.provinsi}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="city">City</Label>
        <Select
          value={formData.city}
          onValueChange={(city) => setFormData(prev => ({ ...prev, city }))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select city" />
          </SelectTrigger>
          <SelectContent>
            {cities.map((city: any) => (
              <SelectItem key={city.kota} value={city.kota}>
                {city.kota}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="postalCode">Postal Code</Label>
        <Input
          id="postalCode"
          value={formData.postalCode}
          onChange={(e) => {
            const value = e.target.value.slice(0, 5);
            setFormData(prev => ({ ...prev, postalCode: value }));
            validatePostalCode(value);
          }}
          required
          maxLength={5}
          className={isPostalValid ? "border-green-500" : ""}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Textarea
          id="address"
          value={formData.address}
          onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="purchaseDate">Purchase Date</Label>
        <Input
          id="purchaseDate"
          type="date"
          value={formData.purchaseDate}
          onChange={(e) => setFormData(prev => ({ ...prev, purchaseDate: e.target.value }))}
          required
          max={new Date().toISOString().split('T')[0]}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="receipt">Upload Receipt</Label>
        <Input
          id="receipt"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          required
        />
      </div>

      <Button type="submit" className="w-full">Submit Warranty Registration</Button>
    </form>
  );
};
