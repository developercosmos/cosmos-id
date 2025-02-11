
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { SERVER_URL } from "@/config/serverConfig";
import { useQuery } from "@tanstack/react-query";
import { Trash2, MapPin } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ServiceCenter {
  id: number;
  name: string;
  address: string;
  phone: string;
  latitude: number;
  longitude: number;
}

const ServiceCenterManager = () => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const { data: serviceCenters, refetch } = useQuery({
    queryKey: ['serviceCenters'],
    queryFn: async () => {
      const response = await fetch(`${SERVER_URL}/src/server/serviceCenter.php`);
      if (!response.ok) throw new Error('Failed to fetch service centers');
      return response.json() as Promise<ServiceCenter[]>;
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`${SERVER_URL}/src/server/serviceCenter.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          address,
          phone,
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
        }),
      });

      if (!response.ok) throw new Error('Failed to add service center');

      toast({
        title: "Success",
        description: "Service center added successfully",
      });

      // Reset form
      setName("");
      setAddress("");
      setPhone("");
      setLatitude("");
      setLongitude("");
      
      refetch();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add service center",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`${SERVER_URL}/src/server/serviceCenter.php?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error('Failed to delete service center');

      toast({
        title: "Success",
        description: "Service center deleted successfully",
      });
      
      refetch();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete service center",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            placeholder="Service Center Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <Input
            placeholder="Latitude"
            type="number"
            step="any"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            required
          />
          <Input
            placeholder="Longitude"
            type="number"
            step="any"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            required
          />
        </div>
        <Textarea
          placeholder="Full Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <Button type="submit">Add Service Center</Button>
      </form>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {serviceCenters?.map((center) => (
            <TableRow key={center.id}>
              <TableCell>{center.name}</TableCell>
              <TableCell>{center.address}</TableCell>
              <TableCell>{center.phone}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  {center.latitude}, {center.longitude}
                </div>
              </TableCell>
              <TableCell>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(center.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ServiceCenterManager;
