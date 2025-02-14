
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { SERVER_URL } from "@/config/serverConfig";
import { SerialNumberCheck } from "@/components/warranty/SerialNumberCheck";
import { WarrantyForm } from "@/components/warranty/WarrantyForm";
import { TermsAndConditions } from "@/components/warranty/TermsAndConditions";

interface Product {
  fp_id: string;
  fd_name: string;
}

interface Province {
  provinsi: string;
}

const Warranty = () => {
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [showEulaDialog, setShowEulaDialog] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [initialFormData, setInitialFormData] = useState({
    productFamily: "",
    model: "",
    storeName: "",
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

  const handleSerialValidated = (data: any) => {
    setInitialFormData({
      productFamily: data.mvgr2_id,
      model: data.material_id,
      storeName: data.nama_toko_retail || "",
    });
    setShowForm(true);
  };

  const handleFormSubmit = async (formData: any) => {
    if (!agreeToTerms) {
      toast({
        title: "Terms Required",
        description: "Please agree to the terms and conditions",
        variant: "destructive",
      });
      return;
    }

    try {
      let receiptData = "";
      if (formData.receipt) {
        const reader = new FileReader();
        receiptData = await new Promise((resolve, reject) => {
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(formData.receipt);
        });
      }

      const response = await fetch(`${SERVER_URL}/api/QA/Index`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          d: [{
            action: "regist",
            sn: formData.serialNumber,
            custname: formData.fullName,
            phone: formData.phone,
            address: formData.address,
            prov: formData.province,
            city: formData.city,
            postal: formData.postalCode,
            buydate: formData.purchaseDate,
            storeid: formData.storeId,
            storename: formData.storeName,
            custemail: formData.email,
            user: "web",
            origin: "W",
            photo_invoice: receiptData.split(',')[1] || "",
          }],
          i: "CA0E8483-C540-11EC-95E1-067C8FBEA972"
        })
      });

      const data = await response.json();

      if (data[0].return_type === "Success") {
        toast({
          title: "Success",
          description: data[0].return_message,
        });
        // Reset form
        setShowForm(false);
        setAgreeToTerms(false);
      } else {
        toast({
          title: "Error",
          description: data[0].return_message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error submitting warranty registration:', error);
      toast({
        title: "Error",
        description: "Failed to submit warranty registration",
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
                <SerialNumberCheck onSerialValidated={handleSerialValidated} />

                {showForm && (
                  <>
                    <WarrantyForm
                      initialData={initialFormData}
                      onSubmit={handleFormSubmit}
                      provinces={provinces}
                    />
                    <div className="flex items-center justify-between">
                      <Button
                        variant="outline"
                        onClick={() => setShowEulaDialog(true)}
                      >
                        View Terms
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <TermsAndConditions
        open={showEulaDialog}
        onOpenChange={setShowEulaDialog}
        onAgree={setAgreeToTerms}
        agreed={agreeToTerms}
      />

      <Footer />
    </div>
  );
};

export default Warranty;
