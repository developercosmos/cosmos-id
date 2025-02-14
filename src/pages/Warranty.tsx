
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { SERVER_URL } from "@/config/serverConfig";

interface Product {
  fp_id: string;
  fd_name: string;
}

interface Province {
  provinsi: string;
}

const Warranty = () => {
  const { toast } = useToast();
  const [serialNumber, setSerialNumber] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [showEula, setShowEula] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [isPostalValid, setIsPostalValid] = useState(false);
  const [showEulaDialog, setShowEulaDialog] = useState(false);

  const [formData, setFormData] = useState({
    productFamily: "",
    model: "",
    fullName: "",
    phone: "",
    email: "",
    address: "",
    purchaseDate: "",
    storeName: "",
    receipt: null as File | null,
  });

  useEffect(() => {
    fetchFamilyProducts();
    fetchProvinces();
  }, []);

  const fetchFamilyProducts = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/api/PRO/Index`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          d: [{}],
          i: "11E044EE-33E7-11EB-9D97-0AB723CF68D0"
        })
      });
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast({
        title: "Error",
        description: "Failed to fetch product families",
        variant: "destructive",
      });
    }
  };

  const fetchProvinces = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/api/PRO/Index`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          d: [{}],
          i: "1350239D-327D-11EB-B811-0206859B6046"
        })
      });
      const data = await response.json();
      setProvinces(data);
    } catch (error) {
      console.error('Error fetching provinces:', error);
      toast({
        title: "Error",
        description: "Failed to fetch provinces",
        variant: "destructive",
      });
    }
  };

  const handleSerialCheck = async () => {
    if (serialNumber.length !== 9 && serialNumber.length !== 17) {
      toast({
        title: "Invalid Serial Number",
        description: "Serial number must be 9 or 17 characters long",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch(`${SERVER_URL}/api/QA/Index`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          d: [{
            sn: serialNumber,
          }],
          i: "90D1641F-4E6E-11EB-9178-0AF22625E0F4"
        })
      });
      
      const data = await response.json();
      
      if (data[0].return_type === "Error") {
        toast({
          title: "Error",
          description: data[0].return_message,
          variant: "destructive",
        });
      } else {
        setShowForm(true);
        setFormData(prev => ({
          ...prev,
          productFamily: data[0].mvgr2_id,
          model: data[0].material_id,
          storeName: data[0].nama_toko_retail || "",
        }));
      }
    } catch (error) {
      console.error('Error checking serial number:', error);
      toast({
        title: "Error",
        description: "Failed to verify serial number",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-3xl font-bold text-center mb-8">Warranty Registration</h1>
        
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="serialNumber">Serial Number</Label>
                  <div className="flex gap-2">
                    <Input
                      id="serialNumber"
                      placeholder="Enter serial number"
                      value={serialNumber}
                      onChange={(e) => setSerialNumber(e.target.value)}
                    />
                    <Button onClick={handleSerialCheck}>Check</Button>
                  </div>
                </div>

                {showForm && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="productFamily">Product Family</Label>
                      <Select
                        value={formData.productFamily}
                        onValueChange={(value) => 
                          setFormData(prev => ({ ...prev, productFamily: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select product family" />
                        </SelectTrigger>
                        <SelectContent>
                          {products.map((product) => (
                            <SelectItem key={product.fp_id} value={product.fp_id}>
                              {product.fd_name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Add the rest of the form fields here */}
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        value={formData.fullName}
                        onChange={(e) => 
                          setFormData(prev => ({ ...prev, fullName: e.target.value }))
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => 
                          setFormData(prev => ({ ...prev, email: e.target.value }))
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => 
                          setFormData(prev => ({ ...prev, phone: e.target.value }))
                        }
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="terms"
                        checked={agreeToTerms}
                        onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                      />
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        I agree to the terms and conditions
                      </label>
                      <Button variant="outline" onClick={() => setShowEulaDialog(true)}>
                        View Terms
                      </Button>
                    </div>

                    <Button
                      className="w-full"
                      disabled={!agreeToTerms}
                      onClick={() => {
                        // Handle form submission
                      }}
                    >
                      Register Warranty
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={showEulaDialog} onOpenChange={setShowEulaDialog}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Terms and Conditions</DialogTitle>
            <DialogDescription>
              Please read the following terms and conditions carefully.
            </DialogDescription>
          </DialogHeader>
          <div className="max-h-[60vh] overflow-y-auto space-y-4">
            {/* EULA content */}
            <div className="space-y-2">
              <h3 className="font-semibold">Warranty Terms:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Free Lifetime Service (No Service Fee).</li>
                <li>Product warranty period is 1 year after purchase date, warranty applies to function-related parts.</li>
                <li>Fan Motor warranty period is 5 years from purchase date except 18 TIF for 3 years from purchase date.</li>
                <li>Dispenser Compressor warranty period is 3 years from purchase date.</li>
                <li>Water Pump motor warranty period is 3 years from purchase date.</li>
                <li>Grade and Discontinued items warranty period is 6 months from purchase date.</li>
                {/* Add more terms as needed */}
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Warranty;
