
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { API_URL } from "@/config/serverConfig";

interface SerialNumberCheckProps {
  onSerialValidated: (data: any) => void;
}

export const SerialNumberCheck = ({ onSerialValidated }: SerialNumberCheckProps) => {
  const [serialNumber, setSerialNumber] = useState("");
  const { toast } = useToast();

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
      const response = await fetch(`${API_URL}/api/QA/Index`, {
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
        onSerialValidated(data[0]);
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
  );
};
